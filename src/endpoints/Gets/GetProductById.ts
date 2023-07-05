import { Request, Response } from "express";
import { db } from "../../knex";

export const getProductById = async (req: Request, res: Response) => {

  const id = req.body.id

  try {
    const result = await db.raw(`
    SELECT * FROM products
    WHERE id LIKE '%${id}%';
    `)
    res.status(200).send(result)
  } catch (error:any) {
    if (error instanceof Error) {
      res.send(error.message)
    } 
      res.status(500).send("Erro desconhecido")
  }
}
