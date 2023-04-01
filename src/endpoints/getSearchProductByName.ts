import { Request, Response } from "express";
import { products } from "../database";
import { TProduct } from "../types";

export const getSearchProductByName = (req: Request, res: Response) => {
  const q = req.query.q as string;

  if (q === "") {
    return res
      .status(400)
      .send("Digite o nome do produto que deseja pesquisar");
  }

  const productsFound: TProduct[] = products.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase())
  );

  if (productsFound.length === 0) {
    return res.status(404).send("Não foi encontrado produto com esse nome");
  }

  res.status(200).send({ mensage: "Produto(s) encontrado(s)", productsFound });
};