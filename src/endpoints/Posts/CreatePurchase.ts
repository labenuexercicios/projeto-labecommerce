import { Request, Response } from "express"
import { TPurchase } from "../../types"
import { db } from "../../knex";

export const createPurchase = async (req: Request, res: Response) => {

    const { id, buyer, total_price, products } = req.body

    try {

        for (const key in req.body) {
            if (req.body[key as keyof TPurchase] === undefined) {
                res.status(400)
                throw new Error("Informe todos os campos.")
            }
        }

        if (typeof id !== "string" || typeof buyer !== "string") {
            res.status(400)
            throw new Error("Por favor, preencha com strings os campos que pedem esse formato.")
        }

        if (!id.includes("pc") && id.length < 5) {
            res.status(400)
            throw new Error("Por favor, insira um id no formato válido (pc + número do pedido). Mínimo de 5 caracteres.")
        }

        if (typeof total_price !== "number" && total_price < 2.99) {
            res.status(400)
            throw new Error("Por favor, o preço total deve ser um número com o valor mínimo de um de nossos produtos.")
        }

        if (products.length < 1) {
            res.status(400)
            throw new Error("Nenhum produto inserido, por favor insira ao menos um produto.")
        }

        const [existedID] = await db("purchases").where({ id: id });
        if (existedID) {
            res.status(400)
            throw new Error("Pedido já existente.");
        }

        const [existedBuyer] = await db("users").where({ id: buyer });
        if (!existedBuyer) {
            res.status(400);
            throw new Error("Este usuário não está registrado.");
        }

        const newPurchase = {
            id: id,
            buyer: buyer,
            total_price: total_price,
            created_at: new Date().toISOString()
        }

        const result = await db("purchases").insert(newPurchase)

        for (let product of products) {
            const newPurchase_Product = {
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity,
            };
            await db("purchases_products").insert(newPurchase_Product);
        }

        res.status(200).send({ message: "Pedido cadastrado com sucesso." })

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


