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
    total_price NUMBER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
);


--Base Table - Purchases_products:

CREATE TABLE IF NOT EXISTS purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
);


--Select all tables:

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM purchases;

SELECT * FROM purchases_products;


--Populate test:

INSERT INTO users (id, name, email, password)
VALUES
    ("c001", "Augustus", "augustus@email.com", "123456"),
    ("c002", "Tiberius", "tiberius@email.com", "123456"),
    ("c003", "Caligula", "gaius@email.com", "123456"),
    ("c004", "Claudius", "claudius@email.com", "123456");


INSERT INTO products (id, name, price, description, image_url)
VALUES
    ("p001", "Amphora of wine", "50", "The Empire's favorite beverage", "https://www.archaeologs.com/uploads/words/151/23962539-409f-46ec-91d3-f16a4510.jpg"),
    ("p002", "Amphora of garum", "50", "Smells nice", "https://www.archaeologs.com/uploads/words/151/23962539-409f-46ec-91d3-f16a4510.jpg"),
    ("p003", "Laurel Wreath", "10", "A Humble crown for a Glorious Princeps", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-EXBsBaOSwoC1o3I_Qn7S4LhKKAlZVaIJQ0Wv01jXS27NL7s7rYppmEEkVOQwPGcFEgA&usqp=CAU");


INSERT INTO purchases (id, buyer, total_price)
VALUES
    ("pur001", "c001", 50),
    ("pur002", "c002", 100);


INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("pur001", "p003", 5),
    ("pur002", "p002", 2);
