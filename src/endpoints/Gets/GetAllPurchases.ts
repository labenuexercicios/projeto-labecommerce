import { Request, Response } from "express";
import { purchases } from "../../database/database";

export const getAllPurchases = (req: Request, res: Response) => {
  
  try {
    if(!purchases){
      res.status(400)
      throw new Error("Página inválida.")
    }
    if (purchases.length <=0) {
      res.statusCode = 404;
      throw new Error("Nenhuma compra encontrada, faça uma compra")
    }
    res.status(200).send(purchases)
  }
  catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } res.status(500).send("Erro desconhecido")
  }
}
