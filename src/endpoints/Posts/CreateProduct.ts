import { Request, Response } from "express"
import { TProduct } from "../../types"
import { products } from "../../database/database"

export const createProduct = (req: Request, res: Response) => {

    try {
        const { id, name, price, description, image_url } = req.body

        const newProduct: TProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        }

        for (const key in newProduct) {
            if (newProduct[key as keyof TProduct] === undefined) {
                throw new Error(`Informe todos os campos`)
            }
        }

        if (typeof id !== "string") {
            throw new Error("O id precisa ser uma string")
        }
        if (!image_url.includes(".png") || !image_url.includes(".jpg")) {
            throw new Error("A imagem do produto deve estar nos formatos PNG ou JPG")
        }

        const [idExist]: TProduct[] = products.filter(element => element.id === id)

        if (idExist) {
            throw new Error(`ID: "${id}" já está cadastrado.`)
        }
        products.push(newProduct)
        res.status(201).send({ message: "Produto cadastrado com sucesso:", newProduct })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}