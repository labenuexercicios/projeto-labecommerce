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
    description TEXT not null    
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
