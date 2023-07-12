import { Request, Response } from "express";
import { db } from "../../knex";

export const getPurchaseById = async (req: Request, res: Response) => {

  const id = req.params.id

  try {

    const [purchase] = await db("purchases")
    .select()
    .where({id: id})


    const purchased_products = await db("purchases_products")
    .select()
    .where({purchase_id: id})

    const list = []

    for (let product of purchased_products){
      const [prod] = await db("products")
      .select()
      .where({id: product.product_id})
      list.push(prod)
    }

    const [user] = await db("users")
    .select()
    .where({id: purchase.buyer})

    const result = {
      purchase_id: purchase.id,
      totalPrice: purchase.total_price,
      createdAt: purchase.created_at,
      buyerId: user.id,
      buyerEmail: user.email,
      products: list
    }

      if (!result) {
        res.status(400)
       throw new Error("Insira um id válido.")
     }
     
    res.status(200).send(result)

  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.status(400).send("Pedido não encontrado.")
    }
    res.status(500).send("Erro desconhecido, faça uma nova requisição.")
  }
}
