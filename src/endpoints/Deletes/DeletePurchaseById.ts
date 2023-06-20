import { Request, Response } from "express";
import { purchases } from "../../database/database";

export const deleteUserById = (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const purchaseIndex = purchases.findIndex(element => element.id === id)

    if (purchaseIndex) {
      purchases.splice(purchaseIndex, 1)
      res.status(200).send("Compra deletada com sucesso.")
    }
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).send("Insira um Id válido")
    } res.status(500).send("Erro desconhecido")
  }
}