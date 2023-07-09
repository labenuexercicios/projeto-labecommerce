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
        created_at: new Date
    }

    try {

        const result = await db("users").insert(newUser)
        const [user] = await db("users")
        .select()
        .where({ id: id })

        if (user.id === id) {
            throw new Error('Id já cadastrado')
        } if (user.email === email) {
            throw new Error('Email já cadastrado')
        }

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

        res.status(200).send(result)
        res.status(201).send({ message: "Conta criada com sucesso:", newUser })
    }

    catch (error: any) {
        if (error instanceof Error) {
            res.send(error.message)
        }
        res.status(500).send("Erro desconhecido")
    }
}
