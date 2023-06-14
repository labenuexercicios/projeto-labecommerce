import { Request, Response } from "express";
import { accounts } from "../database";

export const getAllUsers = (req:Request, res:Response) => {
  res.status(200).send(accounts)
}