import { Request, Response } from "express";
import { db } from "../../knex";

export const getAllPurchases = async (req: Request, res: Response) => {

  try {
    const result = await db.raw(`
    SELECT * FROM purchases
    `)
    res.status(200).send(result)
  } catch (error:any) {
    if (error instanceof Error) {
      res.send(error.message)
    } 
      res.status(500).send("Erro desconhecido")
  }
}
