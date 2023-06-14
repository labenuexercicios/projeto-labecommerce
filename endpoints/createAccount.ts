import { Request, Response } from "express"
import { TUser } from "../types"
import { users } from "../database"

export const createAccount = (req: Request, res: Response) => {
    const { id, name, email, password, created_at} = req.body
    const newUser: TUser = {
        id,
        name,
        email,
        password,
        created_at
    }

    for (const key in newUser) {
        if (newUser[key as keyof TUser] === undefined) {
            res.status(400).send(`All fields must be informed`)
            // throw new Error(`All fields must be informed`)
        }
        if (key === "balance" && key !== undefined) {
            if (typeof newUser[key as keyof TUser] !== 'number') {
                res.status(422).send(`${key} must be a number`)
                // throw new Error(`${key} must be a number`)
            }
        }
        else {
            if (typeof newUser[key as keyof TUser] !== "string") {
                res.status(422).send(`${key} must be a string`)
                // throw new Error(`${key} must be a string`)
            }
        }
    }

    const [userExist]: TUser[] = users.filter(element => element.id === id)
    if (userExist) {
        res.status(409).send(`ID: "${id}" already exists`)
        // throw new Error(`ID: "${id}" already exists`)
    }
    users.push(newUser)
    res.status(201).send({ message: "Successfully created account", newUser })

}