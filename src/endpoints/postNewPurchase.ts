import { Request, Response } from "express";
import { products, purchases, users } from "../database";
import { TProduct, TPurchase, TUser } from "../types";

export const postNewPurchase = (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  if (typeof userId !== "number") {
    return res.status(400).send("ID tem que ser number");
  }
  if (typeof productId !== "string") {
    return res.status(400).send("O nome tem que ser string");
  }
  if (typeof quantity !== "number") {
    return res.status(400).send("A senha tem que ser string");
  }

  const userFound: TUser | undefined = users.find((user) => user.id === userId);
  if (!userFound) {
    return res.status(400).send("Usuário não cadastrado");
  }
  const productFound: TProduct | undefined = products.find(
    (product) => product.id === productId
  );
  if (!productFound) {
    return res.status(400).send("Produto não cadastrado");
  }

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice: quantity * productFound.price,
  };

  purchases.push(newPurchase);

  res
    .status(201)
    .send({ mensage: "Compra realizada com sucesso", newPurchase });
};