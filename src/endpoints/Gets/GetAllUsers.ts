import { Request, Response } from "express";
import { db } from "../../knex";

export const getAllUsers = async (req: Request, res: Response) => {

  try {

    const result = await db("users").select()
    res.status(200).send(result)

  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.status(400).send(error.message)
    }
    res.status(500).send("Erro desconhecido, faça uma nova requisição.")
  }
}
