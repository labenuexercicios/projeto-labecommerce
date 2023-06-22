CREATE TABLE if NOT EXISTS users (
    id PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL   
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
    created_at TEXT not null    
); 

CREATE TABLE if NOT EXISTS purchases_products (
    purchase_id PRIMARY KEY UNIQUE NOT NULL,
    product_id TEXT NOT NULL, 
    quantity INTEGER  
); 

INSERT INTO users (id, name, email, password, created_at)
VALUES 
('001', 'Mary Christmas', 'marychristmas@email.com', 'mypassword1', DATETIME('now')),
('002', 'Jungle Jim', 'junglejim@email.com', 'mypassword2', DATETIME('now')),
('003', 'Suzi Snoozie', 'suzisnoozie@email.com', 'mypassword3', DATETIME('now')),
('004', 'Tom Apple', 'tomapple@email.com', 'mypassword4', DATETIME('now')),
('005', 'Michael Jackson', 'michaeljackson@email.com', 'mypassword5', DATETIME('now'));


INSERT INTO products (id, name, price, description, image_url)
VALUES 
( '001', 'Cheeseburger', 19.99, "A fat cheeseburger with our homemade burger meat, tomato and lettuce. Non-cheese version costs $ 14.99.","https://i.ibb.co/WWvfS5S/burger.png" ),
( '002', 'Double Burger', 29.99, 'Our cheeseburger with double meat and much more cheese, do not waste your time! Non-cheese version costs $ 24.99.',"https://i.ibb.co/KjZm192/doubleburger.png" ),
( '003', 'Big Bacon', 34.99, 'Look at this big monster. The big bacon contains a 110g blend, cheddar, tons of bacon slices and an artesanal bread. Non-cheese version costs $29.99.',"https://i.ibb.co/BLszRx4/bigbacon.png" ),
( '004', 'French Fries (Simple)', 9.99, 'Our best salted french fries in our simple red package. Contains 150g and comes with ketchup and mustard sauce.',"https://i.ibb.co/FVxwG9v/fries.png" ),
( '005', 'French Fries (Pot)', 19.99, 'Our best salted french fries now comes in a ceramic pot (just give it back). Contains 250g and comes with ketchup and mustard sauce.',"https://i.ibb.co/HqCXV1j/biggerfries.png" ),
( '006', 'Crazy French Fries', 29.99, 'Our specialty, the crazy french fries dish is a must! It contains 250g and comes with the traditional sauces, but also a lot of cheddar and pepperoni.',"https://i.ibb.co/QFNqvW1/crazyfries.png" ),
( '007', 'Soda', 8.99, 'A 600ml soda bottle. We have the cola, orange, lemon and brazilian fruit guaraná versions.',"https://i.ibb.co/BNjvKnX/soda.png" ),
( '008', 'Water Bottle', 2.99, 'A 500ml fresh water bottle. The sparkling version costs the same price.',"https://i.ibb.co/sj1PHBM/water.png" ),
( '009', 'Juice', 11.99, 'A 500ml cup of fruit juice. We have a lot of options and charge a plus $1 if you want it milk-based. Plastic cups for delivery orders.',"https://i.ibb.co/0nb4972/juice.png" ),
( '010', 'Ice Cream', 2.99, 'The popular one ice cream ball on a cone. Two balls for $ 3.49, three for $ 3.99. Maximum of 3 balls. Avaliable flavors are vanilla, strawberry or chocolate.',"https://i.ibb.co/j81YfVJ/icecream.png" ),
( '011', 'Milkshake', 14.99, 'A traditional 500ml milkshake. Avaliable flavors are vanilla, strawberry or chocolate.',"https://i.ibb.co/k4J3PTx/milkshake.png" ),
( '012', 'Brazilian Açaí', 11.99, 'Açaí is a popular Amazonian fruit highly used in Brazil as a dish or dessert. This version is an 500ml ice-cream like dessert with a lot of sides!',"https://i.ibb.co/nDK103d/acai.png");

-- GET ALL USERS 
SELECT * FROM users;

-- GET ALL PRODUCTS 1
SELECT * FROM products;

-- GET ALL PRODUCTS 2 
SELECT * FROM products
WHERE name LIKE '%burger%';

-- DELETE USER BY
DELETE FROM users
WHERE id = 0;

-- DELETE PRODUCT BY ID 

DELETE FROM products
WHERE id = 0;

-- EDIT PRODUCT BY ID
UPDATE products
SET name = ""
SET price = 0
SET description = ""
SET image_url = ""
WHERE id = 0;
