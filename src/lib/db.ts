import mysql, { type Pool, type PoolConnection } from 'mysql2/promise';

// One connection pool, reused across hot reloads in dev and across requests on the server.
const g = globalThis as unknown as { _pool?: Pool; _schema?: Promise<void> };

export function pool(): Pool {
  if (!g._pool) {
    g._pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'signaturecovers',
      waitForConnections: true,
      connectionLimit: 8,
      timezone: 'Z', // every date is stored and read as UTC
      charset: 'utf8mb4',
    });
  }
  return g._pool;
}

export async function query<T = any>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await pool().query(sql, params);
  return rows as T[];
}

export async function exec(sql: string, params: unknown[] = []) {
  const [res] = await pool().query(sql, params);
  return res as { insertId: number; affectedRows: number };
}

export async function withTransaction<T>(fn: (c: PoolConnection) => Promise<T>): Promise<T> {
  const c = await pool().getConnection();
  try {
    await c.beginTransaction();
    const out = await fn(c);
    await c.commit();
    return out;
  } catch (e) {
    await c.rollback();
    throw e;
  } finally {
    c.release();
  }
}

/**
 * Creates the tables the first time the site touches the database, so there is nothing to import by hand.
 * The AUTO_INCREMENT starts are the id ranges Shiprocket needs (numeric product and collection ids).
 */
export function ensureSchema(): Promise<void> {
  if (!g._schema) {
    g._schema = (async () => {
      await exec(`CREATE TABLE IF NOT EXISTS collections (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        handle VARCHAR(120) NOT NULL UNIQUE,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(500) NOT NULL DEFAULT '',
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=700000100`);
      await exec(`CREATE TABLE IF NOT EXISTS products (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        handle VARCHAR(120) NOT NULL UNIQUE,
        fabric_id VARCHAR(120) NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        specs TEXT NOT NULL,
        group_name VARCHAR(40) NOT NULL,
        base_price INT NOT NULL,
        quantity INT NOT NULL DEFAULT 100,
        status ENUM('active','draft') NOT NULL DEFAULT 'active',
        image VARCHAR(500) NOT NULL DEFAULT '',
        tags VARCHAR(500) NOT NULL DEFAULT '',
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=500000100`);
      await exec(`CREATE TABLE IF NOT EXISTS product_collections (
        product_id BIGINT UNSIGNED NOT NULL,
        collection_id BIGINT UNSIGNED NOT NULL,
        PRIMARY KEY (product_id, collection_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await exec(`CREATE TABLE IF NOT EXISTS orders (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(30) NOT NULL UNIQUE,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        customer_name VARCHAR(100) NOT NULL,
        customer_email VARCHAR(150) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        ship_address VARCHAR(400) NOT NULL,
        ship_city VARCHAR(80) NOT NULL,
        ship_state VARCHAR(80) NOT NULL,
        ship_pincode VARCHAR(12) NOT NULL,
        ship_landmark VARCHAR(120) NOT NULL DEFAULT '',
        ship_country VARCHAR(40) NOT NULL DEFAULT 'India',
        vin VARCHAR(40) NOT NULL DEFAULT '',
        items MEDIUMTEXT NOT NULL,
        subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
        gst DECIMAL(12,2) NOT NULL DEFAULT 0,
        total DECIMAL(12,2) NOT NULL DEFAULT 0,
        courier VARCHAR(80) NOT NULL DEFAULT '',
        awb VARCHAR(80) NOT NULL DEFAULT '',
        admin_note VARCHAR(1000) NOT NULL DEFAULT '',
        sr_order_id VARCHAR(64) NULL UNIQUE,
        payment_status VARCHAR(20) NOT NULL DEFAULT '',
        payment_type VARCHAR(20) NOT NULL DEFAULT '',
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        KEY idx_orders_created (created_at),
        KEY idx_orders_phone (customer_phone),
        KEY idx_orders_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1000`);

      // Databases created before Shiprocket was added get the new columns here.
      const have = await query<{ COLUMN_NAME: string }>(
        "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'orders'",
      );
      const names = new Set(have.map((c) => c.COLUMN_NAME));
      if (!names.has('sr_order_id')) await exec('ALTER TABLE orders ADD COLUMN sr_order_id VARCHAR(64) NULL UNIQUE');
      if (!names.has('payment_status')) await exec("ALTER TABLE orders ADD COLUMN payment_status VARCHAR(20) NOT NULL DEFAULT ''");
      if (!names.has('payment_type')) await exec("ALTER TABLE orders ADD COLUMN payment_type VARCHAR(20) NOT NULL DEFAULT ''");
    })().catch((e) => {
      g._schema = undefined;
      throw e;
    });
  }
  return g._schema;
}
