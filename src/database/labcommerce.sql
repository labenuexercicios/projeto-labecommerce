-- Active: 1688683858104@@127.0.0.1@3306
--Base Table - Users:

CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);


--Base Table - Products:

CREATE TABLE IF NOT EXISTS products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT
);


--Base Table - Purchases:

CREATE TABLE IF NOT EXISTS purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id)
);


--Base Table - Purchased / Sold:

CREATE TABLE IF NOT EXISTS purchased_products(
    purchase_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    product_id TEXT UNIQUE NOT NULL,
    quantity TEXT NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

--Select all tables:

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM purchases;

SELECT * FROM purchased_products;

