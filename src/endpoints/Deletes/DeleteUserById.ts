import { Request, Response } from "express";
import { db } from "../../knex";

export const deleteUserById = async (req: Request, res: Response) => {
  
  const { id } = req.params

  try {
    const result = await db("users")
      .delete()
      .where("id", "=", `${id}`)

      res.status(200).send("Usuário removido com sucesso.")

  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).send("Insira um Id válido.")
    } res.status(500).send("Erro desconhecido, faça uma nova requisição.")
  }
}

