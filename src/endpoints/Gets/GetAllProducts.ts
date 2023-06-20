import { Request, Response } from "express";
import { products } from "../../database/database";

export const getAllProducts = (req: Request, res: Response) => {

  try {
    if (!products) {
      res.status(400)
      throw new Error("Nenhum produto encontrado.")
    }
    res.status(200).send(products)
  }
  catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } res.status(500).send("Erro desconhecido")
  }
}
