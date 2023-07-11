import { Request, Response } from "express"
import { TPurchase } from "../../types"
import { db } from "../../knex";

export const createPurchase = async (req: Request, res: Response) => {

    const { id, buyer, total_price } = req.body

    const newPurchase = {
        id: id,
        buyer: buyer,
        total_price: total_price,
        created_at: new Date().toISOString()
    }

    try {

        const result = await db("purchases").insert(newPurchase)

        for (const key in req.body) {
            if (req.body[key as keyof TPurchase] === undefined) {
                throw new Error("Informe todos os campos.")
            }
        }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string.")
        }

        res.status(200).send({message: "Produto cadastrado com sucesso."})

    } catch (error: any) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        }
        res.status(500).send("Erro desconhecido, faça uma nova requisição.")
    }
}


