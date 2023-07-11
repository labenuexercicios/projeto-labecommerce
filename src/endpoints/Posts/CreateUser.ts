import { Request, Response } from "express"
import { TUser } from "../../types"
import { db } from "../../knex";


export const createUser = async (req: Request, res: Response) => {

    const { id, name, email, password } = req.body

    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        created_at: new Date().toISOString()
    }

    try {

        const result = await db("users").insert(newUser)
    
        for (const key in req.body) {
            if (req.body[key as keyof TUser] === undefined) {
                throw new Error(`Informe todos os campos`)
            }
        }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string")
        } if (password.length < 6) {
            throw new Error('A senha precisa ter no mínimo 6 caracteres')
        }
        
        res.status(200).send({message: "Usuário cadastrado com sucesso."})
    }

    catch (error: any) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        }
        res.status(500).send("Erro desconhecido, faça uma nova requisição.")
    }
}
