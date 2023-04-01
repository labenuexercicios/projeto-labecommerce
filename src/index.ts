import express from "express";
import cors from "cors";
import { getAllUsers } from "./endpoints/getAllUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getSearchProductByName } from "./endpoints/getSearchProductByName";
import { postNewUser } from "./endpoints/postNewUser";
import { postNewPurchase } from "./endpoints/postNewPurchase";
import { postNewProduct } from "./endpoints/postNewProduct";
import { getProductsById } from "./endpoints/getProductsById";
import { getUserPurchasesByUserId } from "./endpoints/getUserPurchasesByUserId";
import { deleteUserById } from "./endpoints/deleteUserById";
import { deleteProductById } from "./endpoints/deleteProductById";
import { putEditUserById } from "./endpoints/putEditUserId";
import { putEditProductById } from "./endpoints/putEditProductById";


const app = express();
app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/users", getAllUsers);
app.post("/users", postNewUser);
app.delete("/users/:id", deleteUserById);
app.put("/users/:id", putEditUserById);

app.get("/products", getAllProducts);
app.get("/product/search", getSearchProductByName);
app.get("/products/:id", getProductsById);
app.post("/products", postNewProduct);
app.delete("/products/:id", deleteProductById);
app.put("/products/:id", putEditProductById);

app.post("/purchases", postNewPurchase);
app.get("/users/:id/purchases", getUserPurchasesByUserId);