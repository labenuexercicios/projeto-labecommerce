import express, { Request, Response } from 'express'
import cors from 'cors'
import { getAllUsers } from './endpoints/getAllUsers'
import { createAccount } from './endpoints/createAccount'
import { getById } from './endpoints/getById'
import { deleteAccount } from './endpoints/deleteAccount'
import { updateAccount } from './endpoints/updateAccount'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")

})
app.get("/accounts", getAllUsers)
app.get("/accounts/:id", getById)
app.post("/accounts", createAccount)
app.put("/accounts/:id", updateAccount)
app.delete("/accounts/:id", deleteAccount)