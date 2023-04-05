import { Request, Response } from "express";
import { users } from "../database";


export const putEditUserById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;


    if (!Number.isInteger(Number(id))) {
      throw new Error("ID inválido");
    }

    const verificationID = users.findIndex((user) => user.id === parseInt(id));

    if (verificationID < 0) {
      throw new Error("Usuário não cadastrado");
    }

    const { email, password } = req.body;


    if (!email && !password) {
      throw new Error("Digite a modificação");
    }

    if (email) {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof email !== "string" || !email.trim() || !email.match(emailRegex)) {
        throw new Error("O email deve ser uma string válida com formato de email correto");
      }
      users[verificationID].email = email.trim();
    }

    if (password) {

      if (typeof password !== "string" || !password.trim() || password.trim().length < 6) {
        throw new Error("A senha deve ser uma string válida com pelo menos 6 caracteres");
      }

      users[verificationID].password = password.trim();
    }

    res.status(200).send({ mensagem: "Cadastro atualizado com sucesso" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
