import { Request, Response } from "express";
import { users } from "../database";

export const deleteUserById = (req: Request, res: Response) => {
  const id = req.params.id;

  const indexUserToDelete = users.findIndex((user) => user.id === id);

  if (indexUserToDelete < 0) {
    return res.status(400).send("Usuário não cadastrado");
  }

  users.splice(indexUserToDelete, 1);

  res.status(200).send("Usuário apagado com sucesso");
};