import { Request, Response } from "express";
import { db } from "../database/knex";

export const searchProductsById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(400);
      throw new Error("ID é obrigatório!");
    }

    const result = await db.select("*").from("products").where({ id: productId });

    if (result.length === 0) {
      res.status(404);
      throw new Error("Produto não encontrado!");
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
};
