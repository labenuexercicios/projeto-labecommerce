import { Request, Response } from "express";
import { products } from "../database";

export const getAllProducts = (req: Request, res: Response) => {
  res.status(200).send({ mensage: "Produtos cadastrados", products });
};