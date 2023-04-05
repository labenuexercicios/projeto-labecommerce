import { Request, Response } from "express";
import { products } from "../database";

export const deleteProductById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id))) {
      throw new Error("ID inválido");
    }

    const indexProductToDelete = products.findIndex(
      (product) => product.id === id
    );

    if (indexProductToDelete < 0) {
      throw new Error("Produto não cadastrado");
    }

    products.splice(indexProductToDelete, 1);

    res.status(200).send("Produto apagado com sucesso");
  } catch (error:any) {
    res.status(400).send(error.message);
  }
};
