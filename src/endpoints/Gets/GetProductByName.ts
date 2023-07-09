import { Request, Response } from "express";
import { db } from "../../knex";

export const getProductByName = async (req: Request, res: Response) => {

  const { name } = req.params

  try {
    const result = await db("products")
    .select()
      .where("name", "LIKE", `%${name}%`)
    res.status(200).send(result)
  } catch (error: any) {
    if (error instanceof Error) {
      res.send(error.message)
    }
    res.status(500).send("Erro desconhecido")
  }
}
