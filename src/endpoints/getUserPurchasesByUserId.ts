import { Request, Response } from "express";
import { purchases, users } from "../database";
import { TPurchase, TUser } from "../types";

export const getUserPurchasesByUserId = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);


    if (!Number.isInteger(Number(id))) {
      throw new Error("ID inválido");
    }
    const userFound: TUser | undefined = users.find((user) => user.id === id);
    if (!userFound) {
      throw new Error("Usuário não cadastrado");
    }

    const result: TPurchase[] = purchases.filter(
      (purchase) => purchase.userId === id
    );

    if (result.length === 0) {
      throw new Error("O usuário não realizou nenhuma compra");
    }

    res.status(200).send({
      message: "Compras realizadas pelo usuário",
      result,
    });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
};
