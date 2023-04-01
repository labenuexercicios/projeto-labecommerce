import { Request, Response } from "express";
import { products } from "../database";

export const deleteProductById = (req: Request, res: Response) => {
  const id = req.params.id;

  const indexProductToDelete = products.findIndex(
    (product) => product.id === id
  );

  if (indexProductToDelete < 0) {
    return res.status(400).send("Produto não cadastrado");
  }

  products.splice(indexProductToDelete, 1);

  res.status(200).send("Produto apagado com sucesso");
};