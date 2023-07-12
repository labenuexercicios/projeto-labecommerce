-- Active: 1689115200511@@127.0.0.1@3306
CREATE TABLE if NOT EXISTS users (
    id PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL  
); 


CREATE TABLE if NOT EXISTS products (
    id PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL,
    description TEXT not null,
    image_url TEXT not null    
); 


CREATE TABLE if NOT EXISTS purchases (
    id PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL, 
    total_price REAL,
    created_at TEXT not null,
    FOREIGN KEY (buyer) REFERENCES users(id)  
    ON UPDATE CASCADE
    ON DELETE CASCADE  
); 


CREATE TABLE if NOT EXISTS purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL, 
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE     
); 

INSERT INTO users (id, name, email, password)
VALUES 
('u001', 'Mary Christmas', 'marychristmas@email.com', 'mypassword1'),
('u002', 'Jungle Jim', 'junglejim@email.com', 'mypassword2'),
('u003', 'Suzi Snoozie', 'suzisnoozie@email.com', 'mypassword3'),
('u004', 'Tom Apple', 'tomapple@email.com', 'mypassword4'),
('u005', 'Michael Jackson', 'michaeljackson@email.com', 'mypassword5');


INSERT INTO products (id, name, price, description, image_url)
VALUES 
( 'p001', 'Cheeseburger', 19.99, "A fat cheeseburger with our homemade burger meat, tomato and lettuce. Non-cheese version costs $ 14.99.","https://i.ibb.co/WWvfS5S/burger.png" ),
( 'p002', 'Double Burger', 29.99, 'Our cheeseburger with double meat and much more cheese, do not waste your time! Non-cheese version costs $ 24.99.',"https://i.ibb.co/KjZm192/doubleburger.png" ),
( 'p003', 'Big Bacon', 34.99, 'Look at this big monster. The big bacon contains a 110g blend, cheddar, tons of bacon slices and an artesanal bread. Non-cheese version costs $29.99.',"https://i.ibb.co/BLszRx4/bigbacon.png" ),
( 'p004', 'French Fries (Simple)', 9.99, 'Our best salted french fries in our simple red package. Contains 150g and comes with ketchup and mustard sauce.',"https://i.ibb.co/FVxwG9v/fries.png" ),
( 'p005', 'French Fries (Pot)', 19.99, 'Our best salted french fries now comes in a ceramic pot (just give it back). Contains 250g and comes with ketchup and mustard sauce.',"https://i.ibb.co/HqCXV1j/biggerfries.png" ),
( 'p006', 'Crazy French Fries', 29.99, 'Our specialty, the crazy french fries dish is a must! It contains 250g and comes with the traditional sauces, but also a lot of cheddar and pepperoni.',"https://i.ibb.co/QFNqvW1/crazyfries.png" ),
( 'p007', 'Soda', 8.99, 'A 600ml soda bottle. We have the cola, orange, lemon and brazilian fruit guaraná versions.',"https://i.ibb.co/BNjvKnX/soda.png" ),
( 'p008', 'Water Bottle', 2.99, 'A 500ml fresh water bottle. The sparkling version costs the same price.',"https://i.ibb.co/sj1PHBM/water.png" ),
( 'p009', 'Juice', 11.99, 'A 500ml cup of fruit juice. We have a lot of options and charge a plus $1 if you want it milk-based. Plastic cups for delivery orders.',"https://i.ibb.co/0nb4972/juice.png" ),
( 'p010', 'Ice Cream', 2.99, 'The popular one ice cream ball on a cone. Two balls for $ 3.49, three for $ 3.99. Maximum of 3 balls. Avaliable flavors are vanilla, strawberry or chocolate.',"https://i.ibb.co/j81YfVJ/icecream.png" ),
( 'p011', 'Milkshake', 14.99, 'A traditional 500ml milkshake. Avaliable flavors are vanilla, strawberry or chocolate.',"https://i.ibb.co/k4J3PTx/milkshake.png" ),
( 'p012', 'Brazilian Açaí', 11.99, 'Açaí is a popular Amazonian fruit highly used in Brazil as a dish or dessert. This version is an 500ml ice-cream like dessert with a lot of sides!',"https://i.ibb.co/nDK103d/acai.png");

INSERT INTO products (id, name, price, description, image_url)
VALUES
( 'p013', 'Bananinha', 2.99, 'A verdadeira mascote da Labenu! Bombom de banana.',"https://i.ibb.co/DkQsZ7g/bananinha.png");

INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES 
('pc001', 'u001', 29.99, DATETIME('now')),
('pc002', 'u002', 19.99, DATETIME('now')),
('pc003', 'u003', 11.99, DATETIME('now')),
('pc004', 'u004', 34.99, DATETIME('now')),
('pc005', 'u005', 14.99, DATETIME('now'))
;

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('pc001','p006', 1),
('pc002','p001', 1),
('pc003','p012', 1),
('pc004','p003', 1),
('pc005','p011', 1)
;

-- GET ALL USERS 
SELECT * FROM users;

-- GET ALL PRODUCTS 1
SELECT * FROM products;

-- GET ALL PRODUCTS 2 
SELECT * FROM products
WHERE name LIKE '%milk%';

-- GET ALL PURCHASES
SELECT * FROM purchases;

-- DELETE USER BY ID
DELETE FROM users
WHERE id = '001';

-- DELETE PRODUCT BY ID 

DELETE FROM products
WHERE id = '013';

-- EDIT PRODUCT BY ID
UPDATE products
SET name = "A",
price = 0,
description = "A",
image_url = "A"
WHERE id = '013';

-- GET PURCHASE BY ID
SELECT 
    purchases.id, 
    purchases.buyer, 
    users.name, users.email, 
    purchases.total_price, 
    purchases.created_at
FROM users
JOIN purchases 
ON users.id = purchases.buyer
WHERE users.id = 'u001';

SELECT 
    purchases.id AS ID,
    products.name AS Product,
    purchases.buyer AS Buyer,
    quantity AS Quantity,
    purchases.total_price AS TotalPrice,
    purchases.created_at AS Date
FROM purchases_products
INNER JOIN purchases 
ON purchase_id = purchases.id
INNER JOIN products 
ON product_id = products.id
;

