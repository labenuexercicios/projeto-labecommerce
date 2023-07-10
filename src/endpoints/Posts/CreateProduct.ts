import { Request, Response } from "express"
import { TProduct } from "../../types"
import { db } from "../../knex";

export const createProduct = async (req: Request, res: Response) => {

    const { id, name, price, description, image_url } = req.body

    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url
    }

    try {
        const result = await db("products").insert(newProduct)

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

        res.status(200).send("Produto cadastrado com sucesso.")

    } catch (error: any) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        }
        res.status(500).send("Erro desconhecido, faça uma nova requisição.")
    }
}

