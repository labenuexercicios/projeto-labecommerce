import { Request, Response } from "express";
import { products } from "../database";
import { TProduct } from "../types";

export const postNewProduct = (req: Request, res: Response) => {
  const { id, name, price, category } = req.body;

  if (typeof id !== "string") {
    return res.status(400).send("ID tem que ser string");
  }
  if (typeof name !== "string") {
    return res.status(400).send("O nome tem que ser string");
  }
  if (typeof price !== "number") {
    return res.status(400).send("O preço tem que ser number");
  }

  const productIdFound = products.find((product) => product.id === id);
  if (productIdFound) {
    return res.status(400).send("ID de produto já cadastrado");
  }
  const productNameFound = products.find((product) => product.name === name);
  if (productNameFound) {
    return res.status(400).send("Nome de produto já cadastrado");
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
    .send({ mensage: "Produto cadastrado com sucesso", newProduct });
};