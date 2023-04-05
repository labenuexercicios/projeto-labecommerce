import { Request, Response } from "express";
import { products } from "../database";
import { CATEGORY, TProduct } from "../types";

export const putEditProductById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const verificationID = products.findIndex((product) => product.id === id);

    if (verificationID < 0) {
      return res.status(400).send("O produto não está cadastrado");
    }

    const { name, price, category } = req.body;

    if (!name && !price && !category) {
      return res.status(400).send("Digite a modificação");
    }

    if (name) {
      if (typeof name !== "string") {
        throw new Error("O nome tem que ser uma string");
      }

      const cleanName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      products[verificationID].name = cleanName;
    }

    if (price) {
      if (typeof price !== "number") {
        throw new Error("O preço tem que ser um número");
      }

      products[verificationID].price = price;
    }

    if (category) {
      if (!Object.values(CATEGORY).includes(category)) {
        throw new Error("A categoria é inválida");
      }

      products[verificationID].category = category;
    }

    res.status(200).send({ mensagem: "Produto atualizado com sucesso" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
