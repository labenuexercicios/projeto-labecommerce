import { Request, Response } from "express"
import { ACCOUNT_TYPE, TAccount } from "../types"
import { accounts } from "../database"

export const createAccount = (req: Request, res: Response) => {
    const { id, ownerName, type } = req.body
    const newAccount: TAccount = {
        id,
        ownerName,
        balance: 0,
        type
    }

    for (const key in newAccount) {
        if (newAccount[key as keyof TAccount] === undefined) {
            res.status(400).send(`All fields must be informed`)
            // throw new Error(`All fields must be informed`)
        }
        if (key === "balance" && key !== undefined) {
            if (typeof newAccount[key as keyof TAccount] !== 'number') {
                res.status(422).send(`${key} must be a number`)
                // throw new Error(`${key} must be a number`)
            }
        }
        else {
            if (typeof newAccount[key as keyof TAccount] !== "string") {
                res.status(422).send(`${key} must be a string`)
                // throw new Error(`${key} must be a string`)
            }
        }
    }

    const [userExist]: TAccount[] = accounts.filter(element => element.id === id)
    if (userExist) {
        res.status(409).send(`ID: "${id}" already exists`)
        // throw new Error(`ID: "${id}" already exists`)
    }

    if (type !== ACCOUNT_TYPE.BRONZE &&
        type !== ACCOUNT_TYPE.SILVER &&
        type !== ACCOUNT_TYPE.GOLD &&
        type !== ACCOUNT_TYPE.PLATINUM &&
        type !== ACCOUNT_TYPE.BLACK) {
        res.status(400).send("Invalid value of type")
        // throw new Error("Invalid value of type")
    }
    accounts.push(newAccount)
    res.status(201).send({ message: "Successfully created account", newAccount })

}