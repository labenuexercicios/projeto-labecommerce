import { Request, Response } from "express";
import { db } from "../../knex";

export const deletePurchaseById = async (req: Request, res: Response) => {

  const { id } = req.params

  try {
    const result = await db("purchases")
      .delete()
      .where("id", "=", `${id}`)

      res.status(200).send({message: "Pedido cancelado com sucesso."})

  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).send("Insira um Id válido.")
    } res.status(500).send("Erro desconhecido, faça uma nova requisição.")
  }
}