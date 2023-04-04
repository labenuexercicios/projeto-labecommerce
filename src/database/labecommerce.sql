CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

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

SELECT * FROM products;

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
