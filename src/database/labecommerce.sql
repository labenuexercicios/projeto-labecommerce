CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE,
    name TEXT,
    email TEXT,
    password TEXT,
    created_at TEXT
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE,
    buyer TEXT,
    total_price REAL,
    created_at TEXT
);

CREATE TABLE purchases_products (
    purchase_id TEXT,
    product_id TEXT,
    quantity INTEGER,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE,
    name TEXT,
    price REAL,
    description TEXT,
    image_url TEXT
);


