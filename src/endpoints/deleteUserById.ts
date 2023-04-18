import { Request, Response } from "express";
import { db } from "../database/knex";

export const deleteUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await db("users").where({ id }).first();

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }
    await db("users").where({ id }).delete();
    res.status(200).send("Usuário deletado com sucesso");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
