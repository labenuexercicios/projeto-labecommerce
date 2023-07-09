import { Request, Response } from "express"
import { db } from "../../knex";

export const editProductById = async (req: Request, res: Response) => {

    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImage_url = req.body.image_url as string | undefined

    try {
        const [product] = await db.select("*").from("products").where({ id: id })

        await db.update({
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            image_url: newImage_url || product.image_url
        }).from("products").where({ id: newId })

        res.status(200).send("Successfully updated account")

    } catch (error: any) {
        if (error instanceof Error) {
            res.send(error.message)
        }
        res.status(500).send("Erro desconhecido")
    }
}
