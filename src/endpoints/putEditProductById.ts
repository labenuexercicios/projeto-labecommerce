import { Request, Response } from "express";
import { products } from "../database";
import { CATEGORY, TProduct } from "../types";

export const putEditProductById = (req: Request, res: Response) => {
  const id = req.params.id;

  const verificationID = products.findIndex((product) => product.id === id);

  if (verificationID < 0) {
    return res.status(400).send("O produto não está cadastrado");
  }

  const {name, price } = req.body;

  if (!name && !price) {
    return res.status(400).send("Digite a modificação");
  }
  if (name) {
    if (typeof name !== "string") {
    return res.status(400).send("O nome tem que ser string");
    }
    products[verificationID].name =name
  }
  if (price) {
    if (typeof price !== "number") {
      return res.status(400).send("O preço tem que ser number");
    }

    products[verificationID].price = price
  }
 

  res.status(200).send({ mensage: "Produto atualizado com sucesso" });
};