CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );



INSERT INTO
    users (id, email, password)
VALUES (
        1,
        "clara@gmail.com",
        "clara123"
    ), (
        2,
        "carlos@gmail.com",
        "carlos123"
    ), (3, "gata@gmail.com", "gata123");

CREATE TABLE
    products (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name TEXT UNIQUE NOT NULL,
        price REAL NOT NULL,
        category TEXT NULL
    );



INSERT INTO
    products (id, name, price, category)
VALUES (
        1,
        "t-shirt",
        49.9,
        "Roupas e calçados"
    ), (
        2,
        "sneakers",
        199.9,
        "Roupas e calçados"
    ), (
        3,
        "backpack",
        79.9,
        "Acessórios"
    ), (
        4,
        "smartphone",
        1499.9,
        "Eletrônicos"
    ), (
        5,
        "headphones",
        299.9,
        "Eletrônicos"
    );

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM products
WHERE name LIKE "%t-shirt%";
INSERT INTO users
VALUES ("4", "bruce@gmail.com", "bruce12");
INSERT INTO products
VALUES ("6", "SSD", 466.9, "Eletrônicos");
SELECT * FROM products
WHERE id = "2";
DELETE FROM users
WHERE id = "3";
DELETE FROM products
WHERE id = "5";

UPDATE users
SET password = "amorgata"
WHERE id = "2";
UPDATE products
SET price = 189.9
WHERE id = "2";
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;
SELECT * FROM products
WHERE price >= 40 AND price <= 2000
ORDER BY price ASC;
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL DEFAULT 0,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, buyer_id)
VALUES ("1", 49.9, "1"),
("2", 199.9, "1"),
("3", 79.9,"2");

UPDATE purchases
SET paid = 1
WHERE id = "2";

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "2";

SELECT
users.id AS userId,
users.email,
purchases.id AS purchaseId,
purchases.total_price AS totalPrice,
(CASE WHEN purchases.paid = 0 THEN 'not paid' ELSE 'paid' END) AS paid,
purchases.delivered_at AS deliveredAt,
purchases.buyer_id AS buyerId
FROM users
INNER JOIN purchases
ON users.id = purchases.buyer_id;

DROP TABLE purchases;