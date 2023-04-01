import { Request, Response } from "express";
import { products } from "../database";
import { TProduct } from "../types";

export const getProductsById = (req: Request, res: Response) => {
  const id = req.params.id;

  const result: TProduct | undefined = products.find(
    (product) => product.id === id
  );

  if (!result) {
    return res.status(404).send("Produto não encontrado");
  }

  res.status(200).send({ mensage: "Produto encontrado", result });
};