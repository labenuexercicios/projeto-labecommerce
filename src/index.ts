import express from "express";
import cors from "cors";
import { getAllUsers } from "./endpoints/getAllUsers";
import { createUser } from "./endpoints/createUser"
import { getAllProducts } from "./endpoints/getAllProducts";
import { searchProductsByName } from "./endpoints/searchProductsByName";
import { createProduct } from "./endpoints/createProduct";
import { searchProductsById } from "./endpoints/searchProductsById";
import { deleteUserById } from "./endpoints/deleteUserById";
import { deleteProductById }  from "./endpoints/deleteProductById";
import { putEditUserById } from "./endpoints/putEditUserId";
import { putEditProductById } from "./endpoints/putEditProductById";
import { createPurchase } from "./endpoints/createPurchase";
import { getUserPurchaseById } from "./endpoints/getUserPurchaseById";
import { getAllPurchase } from "./endpoints/getAllpurchase";

const app = express();
app.use(express.json());

app.use(cors());

app.listen(3003, async () => {
  console.log("Servidor rodando na porta 3003");
});

app.post("/users", createUser); //ok
app.get("/users", getAllUsers);//ok
app.delete("/users/:id", deleteUserById); //ok
app.put("/users/:id", putEditUserById);//ok

app.get("/products", getAllProducts);//ok
app.get("/products/search", searchProductsByName);//ok
app.get("/products/:id", searchProductsById);//ok
app.post("/products", createProduct); //ok
app.delete("/products/:id", deleteProductById);//ok
app.put("/products/:id", putEditProductById);//ok


app.get("/purchase", getAllPurchase)

app.post("/purchases", createPurchase);
app.get("/users/:id/purchases", getUserPurchaseById);
