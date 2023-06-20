import { Request, Response } from "express";
import { users } from "../../database/database";

export const deleteUserById = (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const userIndex = users.findIndex(element => element.id === id)

    if (userIndex) {
      users.splice(userIndex, 1)
      res.status(200).send("Conta deletada com sucesso.")
    }
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).send("Insira um Id válido")
    } res.status(500).send("Erro desconhecido")
  }
}
