-- Active: 1689622869586@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT UNIQUE NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(15) NOT NULL,
  createdAt TEXT DEFAULT (DATETIME()) NOT NULL ,
  PRIMARY KEY (ID)
);


CREATE TABLE products (
  id TEXT  UNIQUE NOT NULL ,
  name VARCHAR(50) NOT NULL,
  price DOUBLE NOT NULL,
  description VARCHAR (300) NOT NULL,
  image_url TEXT NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS purchases (
  id TEXT UNIQUE NOT NULL,
  buyer INT NOT NULL,
  total_price REAL NOT NULL,
  created_at TEXT DEFAULT (DATATIME()),
  PRIMARY KEY (id)
  FOREIGN KEY (buyer) REFERENCES users(id)
  ON UPDATE CASCADE
	ON DELETE CASCADE
);



CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
  ON UPDATE CASCADE
	ON DELETE CASCADE
  
);





















