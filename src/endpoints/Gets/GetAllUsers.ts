import { Request, Response } from "express";
import { users } from "../../database/database";

export const getAllUsers = (req: Request, res: Response) => {

  try {
    if (!users) {
      res.status(400)
      throw new Error("Nenhum  usuário encontrado.")
    }
    res.status(200).send(users)
  }
  catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } res.status(500).send("Erro desconhecido")
  }
}
