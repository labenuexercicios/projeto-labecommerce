import { Request, Response } from "express";
import { products } from "../database";
import { TProduct } from "../types";

export const getProductsById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result: TProduct | undefined = products.find(
      (product) => product.id === id
    );

    if (!result) {
      throw new Error("Produto não encontrado");
    }

    res.status(200).send({ message: "Produto encontrado", result });
  } catch (error:any) {
    res.status(404).send(error.message);
  }
};
