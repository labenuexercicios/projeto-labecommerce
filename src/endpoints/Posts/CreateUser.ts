import { Request, Response } from "express"
import { TUser } from "../../types"
import { users } from "../../database/database"

export const createUser = (req: Request, res: Response) => {


    try {
        const { id, name, email, password } = req.body

        const newUser: TUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            created_at: new Date
        }

        for (const key in newUser) {
            if (newUser[key as keyof TUser] === undefined) {
                throw new Error(`Informe todos os campos`)
            }
            if (key === "balance" && key !== undefined) {
                if (typeof newUser[key as keyof TUser] !== 'number') {
                    throw new Error(`${key} must be a number`)
                }
            } else {
                if (typeof newUser[key as keyof TUser] !== "string") {
                    throw new Error(`${key} must be a string`)
                }
            }
        }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string")
        }
        if (password.length < 6) {
            throw new Error('A senha precisa ter no mínimo 6 caracteres')
        }

        const [idExist]: TUser[] = users.filter(element => element.id === id)
        const [emailExist]: TUser[] = users.filter(element => element.email === email)

        if (idExist) {
            throw new Error(`ID: "${id}" já está cadastrado.`)
        } if (emailExist) {
            throw new Error(`Email: "${email}" já está cadastrado.`)
        }

        users.push(newUser)
        res.status(201).send({ message: "Conta criada com sucesso:", newUser })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
