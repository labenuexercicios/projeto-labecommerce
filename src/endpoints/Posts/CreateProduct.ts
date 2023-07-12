import { Request, Response } from "express"
import { TProduct } from "../../types"
import { db } from "../../knex";

export const createProduct = async (req: Request, res: Response) => {

    const { id, name, price, description, image_url } = req.body

    try {

        for (const key in req.body) {
            if (req.body[key as keyof TProduct] === undefined) {
                res.status(400)
                throw new Error(`Informe todos os campos`)
            }
        }

        if (typeof id !== "string" || typeof name !== "string" ||
            typeof description !== "string" || typeof image_url !== "string") {
            res.status(400)
            throw new Error("Por favor, preencha com strings os campos que pedem esse formato.")
        }

        if (!id.includes("p") && id.length < 4) {
            res.status(400)
            throw new Error("Por favor, insira um id no formato válido (p + número do produto). Mínimo de 4 caracteres.")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("Por favor, o preço deve ser um número.")
        }

        if (!image_url.includes("png") && !image_url.includes("jpg")) {
            res.status(400)
            throw new Error("Por favor, insira links de imagens nos formatos jpg ou png.")
        }

        const [existedID] = await db("products").where({ id: id });
        if (existedID) {
            res.status(400)
            throw new Error("Id já cadastrado.");
        }

        const [existedProduct] = await db("products").where({ name: name });
        if (!existedProduct) {
            res.status(400);
            throw new Error("Produto já cadastrado.");
        }

        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        }

        const result = await db("products").insert(newProduct)

        res.status(200).send({ message: "Produto cadastrado com sucesso." })

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.status(400).send(error.message)
        }
        res.status(500).send("Erro desconhecido, faça uma nova requisição.")
    }
}

