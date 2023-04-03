import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const putEditUserById = (req: Request, res: Response) => {
  const id = req.params.id;

  const verificationID = users.findIndex((user) => user.id === id);

  if (verificationID < 0) {
    return res.status(400).send("Usuário não cadastrado");
  }

  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send("Digite a modificação");
  }
  if (email) {
    if (typeof email !== "string") {
      return res.status(400).send("O email tem que ser string");
    }
    users[verificationID].email = email;
  }
  if (password) {
    if (typeof password !== "string") {
      return res.status(400).send("A senha tem que ser string");
    }

    users[verificationID].password = password;
  }

  res.status(200).send({ mensage: "Cadastro atualizado com sucesso" });
};
