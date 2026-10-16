import { ensureSchema, exec, query } from '@/lib/db';
import { FABRICS, type Fabric } from '@/data/fabrics';
import { SIZE_TIERS, priceForTier, type SizeTier } from '@/data/carData';

export interface ProductDoc {
  id: number;
  handle: string;
  fabricId: string;
  title: string;
  description: string;
  specs: string[];
  group: string;
  basePrice: number;
  quantity: number;
  status: 'active' | 'draft';
  image: string;
  collectionIds: number[];
  tags: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionDoc {
  id: number;
  handle: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const GROUP_INFO: Record<string, { title: string; description: string; productType: string }> = {
  outdoor: { title: 'Outdoor Covers', description: 'Built for rain, sun and dust. For cars parked outside.', productType: 'Outdoor Cover' },
  indoor: { title: 'Indoor Covers', description: 'Soft, breathable covers for the garage or showroom.', productType: 'Indoor Cover' },
  unveiling: { title: 'Unveiling Covers', description: 'Reveal-night covers for launches and handovers.', productType: 'Unveiling Cover' },
};

const TIER_ORDER = Object.keys(SIZE_TIERS) as SizeTier[];

function rowToProduct(r: any, collectionIds: number[]): ProductDoc {
  let specs: string[] = [];
  try {
    specs = JSON.parse(r.specs);
  } catch {}
  return {
    id: Number(r.id),
    handle: r.handle,
    fabricId: r.fabric_id,
    title: r.title,
    description: r.description,
    specs,
    group: r.group_name,
    basePrice: Number(r.base_price),
    quantity: Number(r.quantity),
    status: r.status,
    image: r.image,
    collectionIds,
    tags: r.tags,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

function rowToCollection(r: any): CollectionDoc {
  return {
    id: Number(r.id),
    handle: r.handle,
    title: r.title,
    description: r.description,
    image: r.image,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

async function withCollectionIds(rows: any[]): Promise<ProductDoc[]> {
  if (rows.length === 0) return [];
  const links = await query<{ product_id: number; collection_id: number }>(
    'SELECT product_id, collection_id FROM product_collections WHERE product_id IN (?)',
    [rows.map((r) => r.id)],
  );
  return rows.map((r) => rowToProduct(r, links.filter((l) => Number(l.product_id) === Number(r.id)).map((l) => Number(l.collection_id))));
}

let seeded = false;

/** Fills the catalog from the website's cover range the first time it is needed. Safe to call on every request. */
export async function ensureCatalog() {
  if (seeded) return;
  await ensureSchema();

  const now = new Date();
  const groupIds: Record<string, number> = {};
  for (const [g, info] of Object.entries(GROUP_INFO)) {
    const first = FABRICS.find((f) => f.group === g);
    await exec(
      'INSERT IGNORE INTO collections (handle, title, description, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [g, info.title, info.description, first?.image ?? '', now, now],
    );
    const [row] = await query<{ id: number }>('SELECT id FROM collections WHERE handle = ?', [g]);
    groupIds[g] = Number(row.id);
  }

  for (const f of FABRICS) {
    const [exists] = await query('SELECT id FROM products WHERE handle = ?', [f.id]);
    if (exists) continue;
    const tags = Array.from(new Set(['car cover', f.group, f.badge.toLowerCase()])).join(', ');
    const res = await exec(
      `INSERT IGNORE INTO products (handle, fabric_id, title, description, specs, group_name, base_price, quantity, status, image, tags, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 100, 'active', ?, ?, ?, ?)`,
      [f.id, f.id, f.title, f.description, JSON.stringify(f.specs), f.group, f.price, f.image, tags, now, now],
    );
    if (res.insertId) await exec('INSERT IGNORE INTO product_collections (product_id, collection_id) VALUES (?, ?)', [res.insertId, groupIds[f.group]]);
  }
  seeded = true;
}

export async function listProducts(opts: { activeOnly?: boolean; collectionId?: number; limit?: number; skip?: number } = {}) {
  await ensureCatalog();
  const where: string[] = [];
  const args: unknown[] = [];
  if (opts.activeOnly) where.push("p.status = 'active'");
  if (opts.collectionId) {
    where.push('EXISTS (SELECT 1 FROM product_collections pc WHERE pc.product_id = p.id AND pc.collection_id = ?)');
    args.push(opts.collectionId);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [count] = await query<{ n: number }>(`SELECT COUNT(*) AS n FROM products p ${clause}`, args);
  const limit = opts.limit ? ' LIMIT ? OFFSET ?' : '';
  const rows = await query(`SELECT p.* FROM products p ${clause} ORDER BY p.id${limit}`, opts.limit ? [...args, opts.limit, opts.skip ?? 0] : args);
  return { total: Number(count.n), products: await withCollectionIds(rows) };
}

export async function listCollections(opts: { limit?: number; skip?: number } = {}) {
  await ensureCatalog();
  const [count] = await query<{ n: number }>('SELECT COUNT(*) AS n FROM collections');
  const limit = opts.limit ? ' LIMIT ? OFFSET ?' : '';
  const rows = await query(`SELECT * FROM collections ORDER BY id${limit}`, opts.limit ? [opts.limit, opts.skip ?? 0] : []);
  return { total: Number(count.n), collections: rows.map(rowToCollection) };
}

export async function getProduct(handle: string): Promise<ProductDoc | null> {
  await ensureCatalog();
  const rows = await query('SELECT * FROM products WHERE handle = ?', [handle]);
  return (await withCollectionIds(rows))[0] ?? null;
}

export async function updateProduct(
  handle: string,
  patch: { title?: string; description?: string; basePrice?: number; quantity?: number; status?: 'active' | 'draft' },
): Promise<ProductDoc | null> {
  await ensureCatalog();
  const map: Record<string, string> = { title: 'title', description: 'description', basePrice: 'base_price', quantity: 'quantity', status: 'status' };
  const sets: string[] = ['updated_at = ?'];
  const args: unknown[] = [new Date()];
  for (const [k, col] of Object.entries(map)) {
    const v = (patch as Record<string, unknown>)[k];
    if (v !== undefined) {
      sets.push(`${col} = ?`);
      args.push(v);
    }
  }
  await exec(`UPDATE products SET ${sets.join(', ')} WHERE handle = ?`, [...args, handle]);
  return getProduct(handle);
}

const abs = (origin: string, src: string) => (src.startsWith('http') ? src : `${origin}${src}`);
const iso = (d: Date) => new Date(d).toISOString();

function bodyHtml(p: ProductDoc) {
  return `<p>${p.description}</p><ul>${p.specs.map((s) => `<li>${s}</li>`).join('')}</ul>`;
}

/** One variant per body size, since the price of a cover depends on the size of the car. */
export function variantsFor(p: ProductDoc, origin: string) {
  return TIER_ORDER.map((tier, i) => ({
    id: p.id * 100 + (i + 1),
    title: SIZE_TIERS[tier].label,
    price: priceForTier(p.basePrice, tier).toFixed(2),
    compare_at_price: null as string | null,
    sku: `${p.handle}-${tier}`.toUpperCase(),
    quantity: p.quantity,
    created_at: iso(p.createdAt),
    updated_at: iso(p.updatedAt),
    taxable: true,
    option_values: { 'Body size': SIZE_TIERS[tier].label },
    grams: 1500 + i * 150,
    image: { src: abs(origin, p.image) },
    weight: 1.5 + i * 0.15,
    weight_unit: 'kg',
  }));
}

/** A product in the shape the Shiprocket catalog sync expects. */
export function toShiprocketProduct(p: ProductDoc, origin: string) {
  return {
    id: p.id,
    title: p.title,
    body_html: bodyHtml(p),
    vendor: 'Signature Covers',
    product_type: GROUP_INFO[p.group]?.productType ?? 'Car Cover',
    created_at: iso(p.createdAt),
    handle: p.handle,
    updated_at: iso(p.updatedAt),
    tags: p.tags,
    status: p.status,
    variants: variantsFor(p, origin),
    image: { src: abs(origin, p.image) },
    options: [{ name: 'Body size', values: TIER_ORDER.map((t) => SIZE_TIERS[t].label) }],
  };
}

export function toShiprocketCollection(c: CollectionDoc, origin: string) {
  return {
    id: c.id,
    updated_at: iso(c.updatedAt),
    body_html: `<p>${c.description}</p>`,
    handle: c.handle,
    image: { src: abs(origin, c.image) },
    title: c.title,
    created_at: iso(c.createdAt),
  };
}

export function paging(url: URL) {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(250, Math.max(1, parseInt(url.searchParams.get('limit') || '100', 10) || 100));
  return { page, limit, skip: (page - 1) * limit };
}

/** Re-prices a cart line from the catalog, so a customer cannot change the price in the browser. */
export async function priceFor(fabric: Fabric | undefined, tier: SizeTier | null): Promise<number | null> {
  if (!fabric) return null;
  const doc = await getProduct(fabric.id);
  const base = doc?.basePrice ?? fabric.price;
  return tier ? priceForTier(base, tier) : base;
}
