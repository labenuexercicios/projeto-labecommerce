import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const postNewUser = (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body;

    if (!id || !email || !password) {
      return res.status(400).send("ID, Email e senha são obrigatórios");
    }

    if (typeof id !== "number") {
      throw new Error("ID deve ser um número");
    }
    const userIdFound = users.find((user) => user.id === id);
    if (userIdFound) {
      throw new Error("O ID de usuário já existe");
    }
    if (typeof email !== "string") {
      throw new Error("Email deve ser uma string");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("O email digitado é inválido");
    }
    const userEmailFound = users.find((user) => user.email === email);
    if (userEmailFound) {
      throw new Error("O email já existe");
    }
    if (typeof password !== "string") {
      throw new Error("Senha deve ser uma string");
    }
    if (!/^\d{6}$/.test(password)) {
      throw new Error("A senha deve ter 6 dígitos");
    }

    const newUser: TUser = {
      id,
      email,
      password,
    };

    users.push(newUser);

    res
      .status(201)
      .send({ message: "Usuário cadastrado com sucesso", newUser });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};
