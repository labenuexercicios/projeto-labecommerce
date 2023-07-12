import { Request, Response } from "express";
import { db } from "../../knex";

export const getUserById = async (req: Request, res: Response) => {

  const id = req.params.id

  try {
    const result = await db("users")
      .select()
      .where("id", "=", `${id}`)

    if (!result) {
       res.status(400)
      throw new Error("Insira um id válido.")
    }

    res.status(200).send(result)

  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.status(500).send("Erro desconhecido, faça uma nova requisição.")
  }
}
