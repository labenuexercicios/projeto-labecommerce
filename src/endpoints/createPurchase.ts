import { Request, Response } from "express";
import { db } from "../database/knex";
import { TPurchase, TPurchaseProduct } from "../types";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { id, buyer, products } = req.body;

    if (!id.trim()) throw new Error("'id' não deve estar vazio");
    if (typeof id !== "string") throw new Error("'id' deve ser string");

    const purchaseIdExist = await db("purchases").where({ id }).first();
    if (purchaseIdExist)
      throw new Error("'id' já cadastrado, digite outro valor");

    if (!buyer.trim()) throw new Error("'buyer' não deve estar vazio");
    if (typeof buyer !== "string") throw new Error("'buyer' deve ser string");

    const buyerExist = await db("users").where({ id: buyer }).first();
    if (!buyerExist) throw new Error("Usuário não cadastrado");

    if (products.length === 0)
      throw new Error(
        "'products' deve conter pelo menos um produto para que o pedido seja realizado"
      );

    for (let i in products) {
      const { productId, quantity } = products[i];
      if (typeof productId !== "string")
        throw new Error(
          `'productId' no indice ${i} do array products deve ser string`
        );
      if (typeof quantity !== "number")
        throw new Error(
          `'quantity' no indice ${i} do array products deve ser number`
        );
      if (quantity <= 0)
        throw new Error(
          `'quantity' no indice ${i} do array products deve ser maior que zero`
        );

      const productIdExist = await db("products")
        .where({ id: productId })
        .first();
      if (!productIdExist)
        throw new Error(
          `'productId' no indice ${i} do array products não está cadastrado`
        );
    }

    const totalPricePromise = products.reduce(
      async (
        totalPricePromise: Promise<number>,
        product: { productId: any; quantity: number }
      ) => {
        const [productPrice] = await db
          .select("price")
          .from("products")
          .where({ id: product.productId });
        const totalPriceAccumulated = await totalPricePromise;
        return totalPriceAccumulated + productPrice.price * product.quantity;
      },
      Promise.resolve(0)
    );

    const totalPrice: number = await totalPricePromise;

    const newPurchase: TPurchase = { id, buyer, total_price: await totalPrice };
    await db("purchases").insert(newPurchase);

    for (let product of products) {
      const { productId, quantity } = product;

      const purchasesProductExist = await db("purchases_products")
        .where({ purchase_id: id, product_id: productId })
        .first();

      if (purchasesProductExist) {
        await db("purchases_products")
          .update({ quantity: purchasesProductExist.quantity + quantity })
          .where({ purchase_id: id, product_id: productId });
      } else {
        const newPurchaseProduct: TPurchaseProduct = {
          purchase_id: id,
          product_id: productId,
          quantity,
        };
        await db("purchases_products").insert(newPurchaseProduct);
      }
    }

    res.status(201).send({ message: "Pedido realizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Erro inesperado");
  }
};
