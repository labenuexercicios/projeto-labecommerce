import { Request, Response } from "express";
import { TUser } from "../types";
import { db } from "../database/knex";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (!id || !name || !email || !password) {
      return res
        .status(400)
        .send("ID, nome, e-mail e senha são obrigatórios");
    }

    if (typeof id !== "string") {
      throw new Error("ID deve ser uma string");
    }
    if (typeof name !== "string") {
      throw new Error("Nome deve ser uma string");
    }

    if (typeof email !== "string") {
      throw new Error("Email deve ser uma string");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("O email digitado é inválido");
    }

    if (typeof password !== "string") {
      throw new Error("Senha deve ser uma string");
    }
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
      )
    ) {
      throw new Error(
        "A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }

    const userIdAlreadyExists: TUser = await db("users").where({ id }).first();

    if (userIdAlreadyExists) {
      throw new Error("O ID já existe");
    }

    const userEmailAlreadyExists: TUser = await db("users")
      .where({ email })
      .first();

    if (userEmailAlreadyExists) {
      throw new Error("O e-mail já existe");
    }

    const newUser: TUser = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);

    res.status(201).send({
      message: "Usuário criado com sucesso",
      user: newUser,
    });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
