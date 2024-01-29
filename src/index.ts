import { users, products} from "./database";
import express from 'express';
import { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUser } from "./types";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003");
})

//Pegando todos os usuários: 

app.get("/users", (req: Request, res: Response) => {
    res.send(users)
})

//Pegando todos os produtos: 
app.get("/products", (req: Request, res: Response) => {
    const nameToFind = req.query.name as string
    if(nameToFind){
        const result: TProducts[] = products.filter((product) => {
            return product.name.toLowerCase().includes(nameToFind.toLowerCase())
        }) 
        res.send(result)
    }
    res.send(products)
})


//Criando um novo usuário: 

app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id as string | number
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string | number

    const newUser: TUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    res.status(201).send("Usuário registrado com sucesso")
})


//Criando novos produtos:

app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id as string | number
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct)

    res.status(201).send("Produto registrado com sucesso")
})


//Delete User

app.delete("/users/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id

    const accountIndex = users.findIndex((user) => user.id === idToDelete)


    if(accountIndex >= 0){
        users.splice(accountIndex, 1)
    }

    res.send("User apagado com sucesso!")
})


//Delete Products
app.delete("/products/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id

    const accountIndex = products.findIndex((product) => product.id === idToDelete)


    if(accountIndex >= 0){
        products.splice(accountIndex, 1)
    }

    res.send("Produto apagado com sucesso!")
})


//Edit Products

app.put("/products/:id",(req: Request, res: Response) => {
    //Recebendo o id:
    const idToEdit = req.params.id

    //Classificando as infos recebidas:
    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const result = products.find((product) => product.id === idToEdit)


    if(result){
        result.id = newId || result.id
        result.name = newName || result.name
        result.price = isNaN(Number(newPrice)) ? result.price : newPrice as number
        result.description = newDescription || result.description
        result.imageUrl = newImageUrl || result.imageUrl
        
    }

    res.status(200).send("Produto atualizado com sucesso!")
})
