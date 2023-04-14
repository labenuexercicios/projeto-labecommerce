import express from "express";
import cors from "cors";
import { getAllUsers } from "./endpoints/getAllUsers";
import { createUser } from "./endpoints/createUser"
import { getAllProducts } from "./endpoints/getAllProducts";
import { searchProductsByName } from "./endpoints/searchProductsByName";
import { createProduct } from "./endpoints/createProduct";
import { searchProductsById } from "./endpoints/searchProductsById";
import { deleteUserById } from "./endpoints/deleteUserById";
import { deleteProductById } from "./endpoints/deleteProductById";
import { putEditUserById } from "./endpoints/putEditUserId";
import { putEditProductById } from "./endpoints/putEditProductById";
/* import { postNewPurchase } from "./endpoints/postNewPurchase";
import { getUserPurchasesByUserId } from "./endpoints/getUserPurchasesByUserId"; */
import {createUsersTable, populateUsersTable} from "./endpoints/usersTable"
import { createProductsTable, populateProductsTable } from "./endpoints/productsTable";
import { createPurchasesTable } from "./endpoints/purchaseTable";

const app = express();
app.use(express.json());

app.use(cors());

app.listen(3003, async () => {
  console.log("Servidor rodando na porta 3003");
  await createUsersTable();
  await populateUsersTable();
  await createProductsTable;
  await populateProductsTable();
  await createPurchasesTable();
});

app.post("/users", createUser); //ok
app.get("/users", getAllUsers);//ok
app.delete("/users/:id", deleteUserById); //ok
app.put("/users/:id", putEditUserById);//ok

app.get("/products", getAllProducts);//ok
app.get("/product/search", searchProductsByName);//ok
app.get("/products/:id", searchProductsById);//ok
app.post("/products", createProduct); //ok
app.delete("/products/:id", deleteProductById);//ok
app.put("/products/:id", putEditProductById);//ok

/* app.post("/purchases", postNewPurchase);
app.get("/users/:id/purchases", getUserPurchasesByUserId);
 */
