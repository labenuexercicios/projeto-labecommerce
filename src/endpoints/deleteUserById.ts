import { Request, Response } from "express";
import { users } from "../database";

export const deleteUserById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id))) {
      throw new Error("ID inválido");
    }

    const indexUserToDelete = users.findIndex((user) => user.id === parseInt(id));

    if (indexUserToDelete < 0) {
      throw new Error("Usuário não cadastrado");
    }

    users.splice(indexUserToDelete, 1);

    res.status(200).send("Usuário apagado com sucesso");
  } catch (error:any) {
    res.status(400).send(error.message);
  }
};
