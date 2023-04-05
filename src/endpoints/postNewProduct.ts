import { Request, Response } from "express";
import { products } from "../database";
import { TProduct } from "../types";

export const postNewProduct = (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body;

    if (typeof id !== "string") {
      throw new Error("ID deve ser uma string");
    }
    if (typeof name !== "string") {
      throw new Error("O nome deve ser uma string");
    }
    if (typeof price !== "number") {
      throw new Error("O preço deve ser um número");
    }

    const productIdFound = products.find((product) => product.id === id);
    if (productIdFound) {
      throw new Error("ID de produto já cadastrado");
    }
    const productNameFound = products.find((product) => product.name === name);
    if (productNameFound) {
      throw new Error("Nome de produto já cadastrado");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
    };

    products.push(newProduct);

    res
      .status(200)
      .send({ message: "Produto cadastrado com sucesso", newProduct });
  } catch (err:any) {
    res.status(400).send({ message: err.message });
  }
};
