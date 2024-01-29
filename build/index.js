"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createUser)("u004", "Ana", "a@gmail.com", "12345678");
(0, database_1.createUser)("u007", "Gio", "g@gmail.com", "12345678");
(0, database_1.createProduct)("u150", "mouse gamer", 50.00, "mouse gamer", "mouse gamer");
// console.table(users)
// console.log(getAllUsers());
// console.table(products)
// console.log(getAllProducts());
console.table((0, database_1.searchProductsByName)("gamer"));
