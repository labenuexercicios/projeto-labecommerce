import { Request, Response } from "express"
import { db } from "../../knex";

export const editProductById = async (req: Request, res: Response) => {

    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImage_url = req.body.image_url as string | undefined

    try {
        const [product] = await db.select().from("products").where({ id: id })

        if (!product) {
            res.status(400)
            throw new Error("Insira um Id válido.")
        }

        if(product) {
            await db.update({
            id: product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            image_url: newImage_url || product.image_url,
        }).from("products").where({ id: id })
        }

        res.status(200).send({ message: "Produto atualizado com sucesso!" })

    } catch (error: any) {
        if (error instanceof Error) {
            res.status(400).send("Não foi possível realizar as alterações, produto não encontrado.")
        }
        res.status(500).send("Erro desconhecido, faça uma nova requisição.")
    }
}
