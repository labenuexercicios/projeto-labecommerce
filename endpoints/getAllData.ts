import { Request, Response } from "express";
import { users, products, purchases} from "../database";

export const getAllUsers = (req:Request, res:Response) => {
  res.status(200).send(users)
}

export const getAllProducts = (req:Request, res:Response) => {
  res.status(200).send(products)
}