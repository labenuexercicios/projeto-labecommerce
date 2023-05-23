-- Active: 1682197093629@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT  UNIQUE NOT NULL,
    password TEXT  NOT NULL,
    create_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime'))
);

INSERT INTO users (id,name,email,password) VALUES 
( "01","Genilson","genlison@email.com","123456"),
( "02","Rosa","rosa@email.com","123465"),
( "03","Jose","jose@email.com","124356"),
( "04","Ronaldo","ronaldo@email.com","213456"),
( "05","Luana","luana@email.com","123056"),
( "06","Fernando","fernando@email.com","923456"),
( "07","Lucas","lucas@email.com","773456"),
( "08","Ana","ana@email.com","1255456"),
( "09","Juliana","juju@email.com","623456"),
( "10","flavia","flavia@email.com","113456");

SELECT * FROM  users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products VALUES 
("088", "relogio", 288.00, "ACCESSORIES", "imagem"),
("034", "camisa", 48.00, "CLOTHES_AND_SHOES", "imagem"),
("090", "celular", 900.00, "ELECTRONICS", "imagem"),
("078", "oculos", 88.00, "ACCESSORIES", "imagem"),
("008", "sapato", 68.00, "CLOTHES_AND_SHOES", "imagem"),
("028", "mouse", 28.00, "ELECTRONICS", "imagem"),
("038", "colar", 58.00, "ACCESSORIES", "imagem"),
("018", "blusa", 18.00, "CLOTHES_AND_SHOES", "imagem"),
("054", "fone", 45.00, "ELECTRONICS", "imagem"),
("024", "pulseira", 20.00, "ACCESSORIES", "imagem");

SELECT * FROM products;

SELECT (name) FROM products;

SELECT * FROM products WHERE name LIKE "%celular%";

INSERT INTO users VALUES("12", "vinicius@email.com", "123456");

INSERT INTO products VALUES("768", "anel", 30.00, "ACCESSORIES");

SELECT * FROM products WHERE id="034";

DELETE FROM users WHERE id="12";

DELETE FROM products WHERE id="768";

UPDATE users
SET 
  id="12"
    WHERE id="10";

SELECT products
SET
  price=100.00
    WHERE id="078";

SELECT * FROM users ORDER BY email ASC;

SELECT *  FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

SELECT *FROM products WHERE price>=18.00 AND price<58.00 ORDER BY price ASC;

CREATE Table purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
 total_price REAL NOT NULL,
 paid INTEGER NOT NULL DEFAULT(0),
 create_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime')),
 buyer_id TEXT NOT NULL,
 FOREIGN KEY (buyer_id) REFERENCES users (id) ON UPDATE CASCADE
);

INSERT INTO purchases (id,total_price,paid, buyer_id) VALUES
("c001", 29.0, 0, "01" ),
("c002", 39.0,1, "02" ),
("c003", 50.0,0, "03" ),
("c004", 79.0,1, "04" );

UPDATE purchasess SET delivered_at= DATETIME) WHERE id="c004";
UPDATE purchasess SET delivered_at= DATETIME) WHERE id="c003";
UPDATE purchasess SET delivered_at= DATETIME) WHERE id="c002";
UPDATE purchasess SET delivered_at= DATETIME) WHERE id="c001";


SELECT * FROM purchases;


SELECT p.id, p.total_price, p.paid, p.delivered_at, p.buyer_id, u.id, u.email 
FROM purchasess AS p 
INNER JOIN users AS u
ON u.id=p.buyer_id;


CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT(1),
  FOREIGN KEY (purchase_id) REFERENCES purchases(id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE
);
 DROP TABLE purchases_products;


INSERT INTO purchases_products(purchase_id , product_id, quantity) VALUES
("c001","018", 1),
("c002","028", 1),
("c003","038", 1);

SELECT * FROM purchases_products;


SELECT
products.id  AS "id do produto",
products.name AS "nome do produto" ,
products.price AS "preço do produto",
purchasess.id AS "id da compra" , 
purchasess.total_price AS "total da compra " 
FROM purchases_products
INNER JOIN products ON purchases_products.product_id=products.id
WHERE purchases_products.purchase_id=
