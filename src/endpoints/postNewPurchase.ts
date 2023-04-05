import { Request, Response } from "express";
import { products, purchases, users } from "../database";
import { TProduct, TPurchase, TUser } from "../types";

export const postNewPurchase = (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (typeof userId !== "number") {
      throw new Error("ID deve ser um número");
    }
    if (typeof productId !== "string") {
      throw new Error("O nome deve ser uma string");
    }
    if (typeof quantity !== "number") {
      throw new Error("A quantidade deve ser um número");
    }

    const userFound: TUser | undefined = users.find((user) => user.id === userId);
    if (!userFound) {
      throw new Error("Usuário não cadastrado");
    }
    const productFound: TProduct | undefined = products.find(
      (product) => product.id === productId
    );
    if (!productFound) {
      throw new Error("Produto não cadastrado");
    }

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice: quantity * productFound.price,
    };

    purchases.push(newPurchase);

    res.status(201).send({ message: "Compra realizada com sucesso", newPurchase });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
