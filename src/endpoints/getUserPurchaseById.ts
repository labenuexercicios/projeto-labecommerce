import { Request, Response } from "express";
import { db } from "../database/knex";

interface Purchase {
  id: number;
  totalPrice: number;
  isPaid: boolean;
  deliveredAt: Date;
  buyedId: number;
  email: string;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const getUserPurchaseById = async (req: Request, res: Response) => {
  const searchUserId = req.params.id;

  try {
    const user = await db<Purchase>("users")
      .select("users.id", "users.email", "users.name")
      .leftJoin("purchases", "users.id", "purchases.buyed_id")
      .where("users.id", searchUserId)
      .first();

    if (!user) {
      return res.status(404).send("Não foi possível encontrar o usuário com esse id");
    }

    const purchase = await db<Purchase>("purchases")
      .select(
        "purchases.id",
        "purchases.total_price AS totalPrice",
        db.raw("purchases.paid = 1 AS isPaid"),
        "purchases.delivered_at AS deliveredAt",
        "purchases.buyed_id AS buyedId",
        "users.email",
        "users.name"
      )
      .leftJoin("users", "purchases.buyed_id", "users.id")
      .where("purchases.buyed_id", user.id)
      .first();

    if (!purchase) {
      return res.status(404).send("Não foi possível encontrar as compras desse usuário");
    }

    const products = await db<Product>("products")
      .select("products.id", "products.name", "products.price", "purchases_products.quantity")
      .innerJoin("purchases_products", "products.id", "purchases_products.product_id")
      .where("purchases_products.purchase_id", purchase.id);

    const response = {
      id: purchase.id,
      totalPrice: purchase.totalPrice,
      isPaid: purchase.isPaid,
      deliveredAt: purchase.deliveredAt,
      buyedId: purchase.buyedId,
      email: purchase.email,
      name: purchase.name,
      products,
    };

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro inesperado");
  }
};
