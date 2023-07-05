import { Request, Response } from "express"
import { TProduct } from "../../types"
import { db } from "../../knex";

export const createProduct = async (req: Request, res: Response) => {

    const { id, name, price, description, image_url } = req.body

    try {
        const result = await db.raw(
            `INSERT INTO products (id, name, price, description, image_url)
            VALUES("${id}", "${name}", ${price}", "${description}", "${image_url}")
            WHERE NOT EXISTS (
                SELECT id FROM users WHERE id='${id}'
            ) AND (
                SELECT name FROM users WHERE name ='${name}'
            )
            LIMIT 1;`
        )

        for (const key in req.body) {
            if (req.body[key as keyof TProduct] === undefined) {
                throw new Error(`Informe todos os campos`)
        }
    }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string")
        }

        if (!image_url.includes(".png") || !image_url.includes(".jpg")) {
            throw new Error("A imagem do produto deve estar nos formatos PNG ou JPG")
        }

        res.status(200).send(result)
        res.status(201).send({ message: "Produto cadastrado com sucesso." })
    
    } catch (error: any) {
        if (error instanceof Error) {
            res.send(error.message)
        }
        res.status(500).send("Erro desconhecido")
    }
}

