import { Request, Response } from "express"
import { TPurchase } from "../../types"
import { purchases } from "../../database/database"

export const createPurchase = (req: Request, res: Response) => {

    try {
        const { id, buyer, total_price } = req.body

        const newPurchase: TPurchase = {
            id: id,
            buyer: buyer,
            total_price: total_price,
            created_at: new Date()
        }

        for (const key in newPurchase) {
            if (newPurchase[key as keyof TPurchase] === undefined) {
                throw new Error(`Informe todos os campos`)
            }
            if (key === "balance" && key !== undefined) {
                if (typeof newPurchase[key as keyof TPurchase] !== 'number') {
                    throw new Error(`${key} must be a number`)
                }
            } else {
                if (typeof newPurchase[key as keyof TPurchase] !== "string") {
                    throw new Error(`${key} must be a string`)
                }
            }
        }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string")
        }

        purchases.push(newPurchase)
        res.status(201).send({ message: "Conta criada com sucesso:", newPurchase })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
