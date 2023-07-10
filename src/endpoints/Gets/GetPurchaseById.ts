import { Request, Response } from "express";
import { db } from "../../knex";

export const getPurchaseById = async (req: Request, res: Response) => {

  const { id } = req.params

  try {

    const products = await db("purchases_products")
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url AS imageUrl",
        "quantity"
      ).where("purchase_id", "=", `${id}`)
      .innerJoin("products",
        "product_id",
        "=",
        "products.id"
      )

    const result = await db("purchases")
      .select(
        "id AS purchaseID",
        "buyer AS buyerID",
        "users.name AS buyerName",
        "users.email AS buyerEmail",
        "total_price AS totalPrice",
        "created_at AS createdAt"
      )
      .where("id", "=", `${id}`)
      .innerJoin("users",
        "purchases.buyer",
        "=",
        "users.id"
      )

    res.status(200).send(result)

  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).send("Insira um Id válido")
    }
    res.status(500).send("Erro desconhecido, faça uma nova requisição.")
  }
}
