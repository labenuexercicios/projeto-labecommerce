import express from 'express'
import cors from 'cors'
import { getAllProducts } from './endpoints/Gets/GetAllProducts'
import { getAllPurchases } from './endpoints/Gets/GetAllPurchases'
import { getAllUsers } from './endpoints/Gets/GetAllUsers'
import { getPurchaseById } from './endpoints/Gets/GetPurchaseById'
import { deleteUserById } from './endpoints/Deletes/DeleteUserById'
import { deletePurchaseById } from './endpoints/Deletes/DeletePurchaseById'
import { createProduct } from './endpoints/Posts/CreateProduct'
import { createUser } from './endpoints/Posts/CreateUser'
import { createPurchase } from './endpoints/Posts/CreatePurchase'
import { editProductById } from './endpoints/Puts/EditProductById'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


app.get("/users", getAllUsers)
app.get("/products", getAllProducts)
app.get("/purchases", getAllPurchases)
app.get("/purchase/:id", getPurchaseById)

app.post("/users", createUser)
app.post("/products", createProduct)

app.put("/products/:id", editProductById)

app.delete("/purchase/:id", deletePurchaseById)
app.delete("/users/:id", deleteUserById)

