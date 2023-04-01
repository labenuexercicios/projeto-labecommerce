import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const putEditUserById = (req: Request, res: Response) => {

  res.status(200).send({ mensage: "Cadastro atualizado com sucesso" });
};