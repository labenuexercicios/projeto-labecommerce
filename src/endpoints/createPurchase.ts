import { Request, Response } from "express";
import { db } from "../database/knex";

interface Product {
  id: string;
  quantity: number;
}

interface Purchase {
  id: string;
  userId: string;
  products: Product[];
}

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { id, userId, products }: Purchase = req.body;

    if (!id || !userId || !products) {
      res.status(400).send("Preencha todos os campos obrigatórios.");
      return;
    }

    if (typeof id !== "string") {
      res.status(400).send("O campo ID deve ser uma string.");
      return;
    }

    if (!id.match(/^\d{4}$/)) {
      res.status(400).send("O ID deve conter 4 dígitos.");
      return;
    }

    if (typeof userId !== "string") {
      res.status(400).send("O campo UserID deve ser uma string.");
      return;
    }

    const userExists = await db("users").where("id", userId);

    if (!userExists.length) {
      res.status(404).send("Usuário não encontrado.");
      return;
    }

    const productsExist = await Promise.all(
      products.map(async ({ id, quantity }) => {
        const productExists = await db("product").where("id", id);

        if (!productExists.length) {
          res.status(404).send(`Produto ${id} não encontrado.`);
          return;
        }

        if (typeof quantity !== "number" || quantity < 1) {
          res
            .status(400)
            .send(
              `A quantidade do produto ${id} deve ser um número maior que zero.`
            );
          return;
        }

        return { ...productExists[0], quantity };
      })
    );

    if (productsExist.some((product) => !product)) {
      return;
    }

    const totalPrice = productsExist.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );

    const purchase = {
      id,
      user_id: userId,
      total_price: totalPrice,
      paid: false,
      delivered_at: null,
    };

    const purchaseProducts = productsExist.map(({ id, quantity }) => ({
      purchase_id: purchase.id,
      product_id: id,
      quantity,
    }));

    await db.transaction(async (trx) => {
      await trx("purchases").insert(purchase);
      await trx("purchases_products").insert(purchaseProducts);
    });

    res.status(201).send("Compra realizada com sucesso.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro inesperado.");
  }
};
