import { Request, Response } from "express";
import { TUser } from "../types";
import { db } from "../database/knex";

export const putEditUserById = async (req: Request, res: Response) => {
  console.log(putEditUserById)
  try {
    const id = req.params.id;

    const [userIdAlreadyExists]: TUser[] | undefined[] = await db(
      "users"
    ).where({ id });

    if (!userIdAlreadyExists) {
      res.status(404);
      throw new Error("O ID não existe");
    }

    const { email, password } = req.body;
    console.log(req.body);
    

    if (!email && !password) {
      throw new Error("Digite a modificação");
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof email !== "string" || !email.trim() || !email.match(emailRegex)) {
        throw new Error("O email deve ser uma string válida com formato de email correto");
      }
      await db("users").update({ email }).where({ id });
    }

    if (password) {
      if (typeof password !== "string") {
        throw new Error("Senha deve ser uma string");
      }
      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
        throw new Error(
          "A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
        )
      }
      await db("users").update({ password }).where({ id });
    }

    res.status(200).send({ mensagem: "Cadastro atualizado com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("erro inesperado");
    }
  }
  
};
