import { Request, Response } from "express";
import { purchases, users } from "../database";
import { TPurchase, TUser } from "../types";

export const getUserPurchasesByUserId = (req: Request, res: Response) => {
  const id = req.params.id;
  if (typeof id !== "number") {
    return res.status(400).send("ID tem que ser number");
  }
  
  const userFound: TUser | undefined = users.find((user) => user.id === id);
  if (!userFound) {
    return res.status(400).send("Usuário não cadastrado");
  }

  const result: TPurchase[] = purchases.filter(
    (purchase) => purchase.userId === id
  );

  if (result.length === 0) {
    return res.status(404).send("O usuário não realizou nenhuma compra");
  }

  res.status(200).send({
    mensage: "Compras realizadas pelo usuário",
    result,
  });
};