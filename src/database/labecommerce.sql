-- Active: 1691627648816@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
    FOREIGN KEY (buyer) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    ON UPDATE CASCADE
    ON DELETE CASCADE
  FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO users (id, name, email, password)
VALUES 
    ('u001', 'user01', 'u001@gmail.com', '234'),
    ('u002', 'user02', 'u002@gmail.com', '234'),
    ('u003', 'user03', 'u003@gmail.com', '234');

INSERT INTO products (id, name, price, description, image_url)
VALUES
    ('p001', 'product01', 19.00, 'sla', 'asdad.com'),
    ('p002', 'product02', 19.00, 'sla', 'asdad.com'),
    ('p003', 'product03', 19.00, 'sla', 'asdad.com'),
    ('p004', 'product04', 19.99, 'sla', 'asdad.com'),
    ('p005', 'product05', 19.99, 'sla', 'asdad.com');

INSERT INTO purchases (id, buyer, total_price)
VALUES 
    ('pu001', 'u001', 50.00),
    ('pu002', 'u002', 100.00),
    ('pu003', 'u003', 150.00);


SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE '';

DELETE * FROM users WHERE id = '';

DELETE * FROM products WHERE id = '';

UPDATE products
SET name = '',
    price = ,
    description = '',
    image_url = ''
WHERE id = '';

SELECT purchases.id AS id_compra, users.id AS id_comprador, users.name, users.email, purchases.total_price, purchases.created_at
FROM purchases
JOIN users ON purchases.buyer = users.id
WHERE purchases.id = '';

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('pu002', 'p004', 4),
    ('pu001', 'p002', 1),
    ('pu001', 'p001', 3);

SELECT purchases_products.*, purchases.*, products.*
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;
