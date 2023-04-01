import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const postNewUser = (req: Request, res: Response) => {
  const { id, email, password } = req.body;

  if (typeof id !== "string") {
    return res.status(400).send("ID tem que ser string");
  }
  if (typeof email !== "string") {
    return res.status(400).send("O nome tem que ser string");
  }
  if (typeof password !== "string") {
    return res.status(400).send("A senha tem que ser string");
  }

  const userIdFound = users.find((user) => user.id === id);
  if (userIdFound) {
    return res.status(400).send("id de usuário já cadastrado");
  }
  const userEmailFound = users.find((user) => user.email === email);
  if (userEmailFound) {
    return res.status(400).send("email de usuário já existe cadastrado");
  }

  const newUser: TUser = {
    id,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).send({ mensage: "Usuário cadastrado com sucesso", newUser });
};