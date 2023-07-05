import { Request, Response } from "express"
import { TPurchase } from "../../types"
import { db } from "../../knex";

export const createPurchase = async (req: Request, res: Response) => {

    const { id, buyer, total_price } = req.body
    try {

        const result = await db.raw(
            `INSERT INTO purchases (id, buyer, total_price, created_at)
                VALUES("${id}", "${buyer}", ${total_price}", DATETIME ('now'))
                WHERE NOT EXISTS (
                    SELECT id FROM users WHERE id='${id}'
                ) 
                LIMIT 1;`
        )

        for (const key in req.body) {
            if (req.body[key as keyof TPurchase] === undefined) {
                throw new Error(`Informe todos os campos`)
            }
        }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string")
        }

        res.status(200).send(result)
        res.status(201).send({ message: "Produto cadastrado com sucesso:" })

    } catch (error: any) {
        if (error instanceof Error) {
            res.send(error.message)
        }
        res.status(500).send("Erro desconhecido")
    }
}


