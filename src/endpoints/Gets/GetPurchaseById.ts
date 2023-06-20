import { Request, Response } from "express";
import { purchases } from "../../database/database";

export const getPurchaseById = (req: Request, res: Response) => {

  try {
    const { id } = req.params

    const result = purchases.find(element => element.id === id)
    if (!result) {
      throw new Error("Compra não encontrada")
    }
    res.status(200).send(result)
  } catch (error) {
      if (error instanceof Error) {
        res.send(error.message)
      } res.status(500).send("Erro desconhecido")
    }
}

