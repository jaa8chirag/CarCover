import { ensureSchema, exec, query, withTransaction } from '@/lib/db';

export const ORDER_STATUSES = ['awaiting_payment', 'new', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  fabricId?: string;
  brandId?: string;
  modelId?: string;
  vehicle: string;
  variant: string;
  product: string;
  coverColor: string;
  piping: string;
  notes: string;
  price: number;
  priceVerified: boolean;
}

export interface OrderDoc {
  orderNumber: string;
  status: OrderStatus;
  customer: { name: string; email: string; phone: string };
  shipping: { address: string; city: string; state: string; pincode: string; landmark: string; country: string };
  vin: string;
  items: OrderItem[];
  /** Price of the covers before GST. Shipping is free. */
  subtotal: number;
  /** 18% GST on the subtotal. */
  gst: number;
  /** What the customer pays: subtotal + GST. */
  total: number;
  tracking: { courier: string; awb: string };
  adminNote: string;
  /** Shiprocket checkout order id, when the order was paid through Shiprocket. */
  shiprocketOrderId: string | null;
  paymentStatus: string;
  paymentType: string;
  createdAt: Date;
  updatedAt: Date;
}

function rowToOrder(r: any): OrderDoc {
  let items: OrderItem[] = [];
  try {
    items = JSON.parse(r.items);
  } catch {}
  return {
    orderNumber: r.order_number,
    status: r.status,
    customer: { name: r.customer_name, email: r.customer_email, phone: r.customer_phone },
    shipping: { address: r.ship_address, city: r.ship_city, state: r.ship_state, pincode: r.ship_pincode, landmark: r.ship_landmark, country: r.ship_country },
    vin: r.vin,
    items,
    subtotal: Number(r.subtotal),
    gst: Number(r.gst),
    total: Number(r.total),
    tracking: { courier: r.courier, awb: r.awb },
    adminNote: r.admin_note,
    shiprocketOrderId: r.sr_order_id ?? null,
    paymentStatus: r.payment_status ?? '',
    paymentType: r.payment_type ?? '',
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

/** Saves a new order and gives it the next number (SC-1000, SC-1001, ...). */
export async function createOrder(doc: Omit<OrderDoc, 'orderNumber' | 'createdAt' | 'updatedAt' | 'shiprocketOrderId' | 'paymentStatus' | 'paymentType'>): Promise<OrderDoc> {
  await ensureSchema();
  const now = new Date();
  const number = await withTransaction(async (c) => {
    const [res]: any = await c.query(
      `INSERT INTO orders (order_number, status, customer_name, customer_email, customer_phone, ship_address, ship_city, ship_state, ship_pincode, ship_landmark, ship_country, vin, items, subtotal, gst, total, courier, awb, admin_note, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `tmp-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
        doc.status,
        doc.customer.name, doc.customer.email, doc.customer.phone,
        doc.shipping.address, doc.shipping.city, doc.shipping.state, doc.shipping.pincode, doc.shipping.landmark, doc.shipping.country,
        doc.vin,
        JSON.stringify(doc.items),
        doc.subtotal,
        doc.gst,
        doc.total,
        doc.tracking.courier, doc.tracking.awb,
        doc.adminNote,
        now, now,
      ],
    );
    const orderNumber = `SC-${res.insertId}`;
    await c.query('UPDATE orders SET order_number = ? WHERE id = ?', [orderNumber, res.insertId]);
    return orderNumber;
  });
  return { ...doc, orderNumber: number, shiprocketOrderId: null, paymentStatus: '', paymentType: '', createdAt: now, updatedAt: now };
}

export async function listOrders(opts: { status?: string; q?: string; page: number; limit: number }) {
  await ensureSchema();
  const where: string[] = [];
  const args: unknown[] = [];
  if (opts.status && (ORDER_STATUSES as readonly string[]).includes(opts.status)) {
    where.push('status = ?');
    args.push(opts.status);
  }
  if (opts.q) {
    const like = `%${opts.q.replace(/[\\%_]/g, '\\$&')}%`;
    where.push('(order_number LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ? OR customer_email LIKE ? OR ship_city LIKE ? OR ship_pincode LIKE ?)');
    args.push(like, like, like, like, like, like);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [[count], rows, counts, [rev]] = await Promise.all([
    query<{ n: number }>(`SELECT COUNT(*) AS n FROM orders ${clause}`, args),
    query(`SELECT * FROM orders ${clause} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`, [...args, opts.limit, (opts.page - 1) * opts.limit]),
    query<{ status: string; n: number }>('SELECT status, COUNT(*) AS n FROM orders GROUP BY status'),
    query<{ sum: string | null }>("SELECT SUM(total) AS `sum` FROM orders WHERE status <> 'cancelled'"),
  ]);
  return {
    total: Number(count.n),
    orders: rows.map(rowToOrder),
    counts: Object.fromEntries(counts.map((c) => [c.status, Number(c.n)])),
    revenue: Number(rev?.sum ?? 0),
  };
}

export async function updateOrder(
  orderNumber: string,
  patch: { status?: OrderStatus; tracking?: { courier: string; awb: string }; adminNote?: string },
): Promise<OrderDoc | null> {
  await ensureSchema();
  const sets: string[] = ['updated_at = ?'];
  const args: unknown[] = [new Date()];
  if (patch.status !== undefined) {
    sets.push('status = ?');
    args.push(patch.status);
  }
  if (patch.tracking) {
    sets.push('courier = ?', 'awb = ?');
    args.push(patch.tracking.courier, patch.tracking.awb);
  }
  if (patch.adminNote !== undefined) {
    sets.push('admin_note = ?');
    args.push(patch.adminNote);
  }
  await exec(`UPDATE orders SET ${sets.join(', ')} WHERE order_number = ?`, [...args, orderNumber]);
  const [row] = await query('SELECT * FROM orders WHERE order_number = ?', [orderNumber]);
  return row ? rowToOrder(row) : null;
}

/** Every person who has ordered, with their latest shipping address and totals. */
export async function listCustomers() {
  await ensureSchema();
  const rows = await query(
    `SELECT o.customer_phone AS phone, o.customer_name AS name, o.customer_email AS email,
            o.ship_address, o.ship_city, o.ship_state, o.ship_pincode, o.ship_landmark, o.ship_country,
            a.orders, a.spent, a.last_order
     FROM orders o
     JOIN (
       SELECT customer_phone, MAX(id) AS last_id, COUNT(*) AS orders,
              SUM(CASE WHEN status = 'cancelled' THEN 0 ELSE total END) AS spent,
              MAX(created_at) AS last_order
       FROM orders GROUP BY customer_phone
     ) a ON a.last_id = o.id
     ORDER BY a.last_order DESC LIMIT 500`,
  );
  return rows.map((r: any) => ({
    phone: r.phone,
    name: r.name,
    email: r.email,
    shipping: { address: r.ship_address, city: r.ship_city, state: r.ship_state, pincode: r.ship_pincode, landmark: r.ship_landmark, country: r.ship_country },
    orders: Number(r.orders),
    spent: Number(r.spent),
    lastOrder: new Date(r.last_order),
  }));
}

/** Saved when the customer is sent to Shiprocket to pay; the address and payment arrive later by webhook. */
export async function createAwaitingOrder(o: { srOrderId: string; items: OrderItem[]; subtotal: number; gst: number; total: number }) {
  await ensureSchema();
  const now = new Date();
  return withTransaction(async (c) => {
    const [existing]: any = await c.query('SELECT order_number FROM orders WHERE sr_order_id = ?', [o.srOrderId]);
    if (existing.length) return existing[0].order_number as string;
    const [res]: any = await c.query(
      `INSERT INTO orders (order_number, status, customer_name, customer_email, customer_phone, ship_address, ship_city, ship_state, ship_pincode, ship_landmark, ship_country, vin, items, subtotal, gst, total, courier, awb, admin_note, sr_order_id, payment_status, payment_type, created_at, updated_at)
       VALUES (?, 'awaiting_payment', '', '', '', '', '', '', '', '', 'India', '', ?, ?, ?, ?, '', '', '', ?, 'Pending', '', ?, ?)`,
      [`tmp-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`, JSON.stringify(o.items), o.subtotal, o.gst, o.total, o.srOrderId, now, now],
    );
    const orderNumber = `SC-${res.insertId}`;
    await c.query('UPDATE orders SET order_number = ? WHERE id = ?', [orderNumber, res.insertId]);
    return orderNumber;
  });
}

const s1 = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : v == null ? '' : String(v).slice(0, max));

/**
 * Applies what Shiprocket's Order Details API says about an order (never the raw webhook body).
 * SUCCESS moves a waiting order to "new"; FAILED cancels it.
 */
export async function applyShiprocketDetails(srOrderId: string, d: any): Promise<{ orderNumber: string; status: OrderStatus } | null> {
  await ensureSchema();
  const [row] = await query<any>('SELECT order_number, status FROM orders WHERE sr_order_id = ?', [srOrderId]);
  if (!row) return null;
  const ship = d?.shipping_address ?? {};
  const name = [ship.first_name, ship.last_name].filter(Boolean).join(' ') || [d?.billing_address?.first_name, d?.billing_address?.last_name].filter(Boolean).join(' ');
  const srStatus = String(d?.status ?? '').toUpperCase();
  let status: OrderStatus = row.status;
  if (srStatus === 'SUCCESS' && row.status === 'awaiting_payment') status = 'new';
  else if (srStatus === 'FAILED' && row.status === 'awaiting_payment') status = 'cancelled';
  const total = Number(d?.total_amount_payable);
  await exec(
    `UPDATE orders SET status = ?, customer_name = ?, customer_email = ?, customer_phone = ?,
       ship_address = ?, ship_city = ?, ship_state = ?, ship_pincode = ?, ship_landmark = ?, ship_country = ?,
       payment_status = ?, payment_type = ?, total = IF(? > 0, ?, total), updated_at = ?
     WHERE sr_order_id = ?`,
    [
      status,
      s1(name, 100), s1(d?.email ?? ship.email, 150), s1(String(d?.phone ?? ship.phone ?? '').replace(/\D/g, '').slice(-10), 20),
      s1([ship.line1, ship.line2].filter(Boolean).join(', '), 400), s1(ship.city, 80), s1(ship.state, 80), s1(ship.pincode, 12), s1(ship.landmark, 120), s1(ship.country || 'India', 40),
      s1(d?.payment_status, 20), s1(d?.payment_type, 20),
      Number.isFinite(total) ? total : 0, Number.isFinite(total) ? total : 0,
      new Date(), srOrderId,
    ],
  );
  return { orderNumber: row.order_number, status };
}
