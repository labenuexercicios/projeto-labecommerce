import express from 'express'
import cors from 'cors'
import { getAllProducts } from './endpoints/Gets/GetAllProducts'
import { getAllPurchases } from './endpoints/Gets/GetAllPurchases'
import { getAllUsers } from './endpoints/Gets/GetAllUsers'
import { getProductById } from './endpoints/Gets/GetProductById'
import { getPurchaseById } from './endpoints/Gets/GetPurchaseById'

import { deleteUserById } from './endpoints/Deletes/DeleteUserById'
import { deletePurchaseById } from './endpoints/Deletes/DeletePurchaseById'
import { deleteProductById } from './endpoints/Deletes/DeleteProductById'

import { createProduct } from './endpoints/Posts/CreateProduct'
import { createUser } from './endpoints/Posts/CreateUser'
import { createPurchase } from './endpoints/Posts/CreatePurchase'

import { editProductById } from './endpoints/Puts/EditProductById'
import { editUserById } from './endpoints/Puts/EditUserById'



const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


// USERS
app.get("/users", getAllUsers)
app.get("/users/:id", getUserById)
app.post("/users", createUser)
app.delete("/users/:id", deleteUserById)
app.put("/users/:id", editUserById)


// PRODUCTS
app.get("/products", getAllProducts)
app.get("/products/:id", getProductById)
app.put("/products/:id", editProductById)
app.post("/products", createProduct)
app.delete("/products/:id", deleteProductById)

// PURCHASES
app.get("/purchases", getAllPurchases)
app.get("/purchases/:id", getPurchaseById)
app.post("/purchases", createPurchase)
app.delete("/purchases/:id", deletePurchaseById)

