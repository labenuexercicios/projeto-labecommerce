import { Request, Response } from "express";
import { users } from "../database";

export const getAllUsers = (req: Request, res: Response) => {
  try {
    if (!users || users.length === 0) {
      throw new Error("Nenhum usuário cadastrado");
    }

    res.status(200).send({ message: "Usuários cadastrados", users });
  } catch (error:any) {
    res.status(500).send({ message: "Erro ao buscar usuários", error });
  }
};
