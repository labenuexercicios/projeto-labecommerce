import { Request, Response } from "express";
import { products } from "../database";
import { CATEGORY, TProduct } from "../types";

export const putEditProductById = (req: Request, res: Response) => {

  res.status(200).send({ mensage: "Produto atualizado com sucesso" });
};