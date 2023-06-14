import { Request, Response } from "express";
import { users } from "../database";

export const getById = (req:Request, res:Response) => {
  const { id } = req.params

  const result = users.find(element => element.id === id)
  if (!result) {
      res.status(404).send("Account Not Found")
      // throw new Error("Account Not Found")
  }
  res.status(200).send(result)
}