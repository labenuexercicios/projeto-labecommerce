import express from 'express'
import cors from 'cors'
import { getAllUsers, getAllProducts, getAllPurchases, getPurchaseById} from './endpoints/Gets/GetPurchaseById'
import { deletePurchaseById, deleteUserById } from './endpoints/Deletes/DeletePurchaseById'
import { createUser, createProduct } from './endpoints/Posts/CreateUser'
import { updateProduct } from './endpoints/Puts/EditProductById'

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

app.put("/products/:id", updateProduct)

app.delete("/purchase/:id", deletePurchaseById)
app.delete("/users/:id", deleteUserById)

