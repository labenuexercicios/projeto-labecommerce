import { Request, Response } from "express"
import { TPurchase } from "../../types"
import { db } from "../../knex";

export const createPurchase = async (req: Request, res: Response) => {

    const { id, buyer, total_price } = req.body

    const newPurchase = {
        id: id,
        buyer: buyer,
        total_price: total_price,
        created_at: new Date
    }

    try {

        const result = await db("purchases").insert(newPurchase)
        const [purchase] = await db("purchases")
        .select()
        .where({ id: id })

        if(purchase){
            throw new Error("Id já cadastrado.")
        }

        for (const key in req.body) {
            if (req.body[key as keyof TPurchase] === undefined) {
                throw new Error("Informe todos os campos.")
            }
        }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string.")
        }

        res.status(200).send(result)
        res.status(201).send({ message: "Produto cadastrado com sucesso:", newPurchase })

    } catch (error: any) {
        if (error instanceof Error) {
            res.send(error.message)
        }
        res.status(500).send("Erro desconhecido.")
    }
}


