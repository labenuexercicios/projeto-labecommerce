import { Request, Response } from "express";
import { CATEGORY, TProduct } from "../types";
import { db } from "../database/knex";

export const putEditProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [productIdAlreadyExists]: TProduct[] | undefined[] = await db(
      "products"
    ).where({ id })

    if (!productIdAlreadyExists) {
      res.status(404);
      throw new Error("O ID não existe");
    }

    const {name, price, category, description } = req.body;

    if (!name && !price) {
      return res.status(400).send("Digite a modificação");
    }

    if (name) {
      if (typeof name !== "string") {
        throw new Error("O nome tem que ser uma string");
      }

      const cleanName =
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      await db("products").update({ name: cleanName }).where({ id: id });
    }

    if (price) {
      if (typeof price !== "number") {
        throw new Error("O preço tem que ser um número");
      }

      await db("products").update({ price: price }).where({ id: id });
    }

    if (category) {
      if (!Object.values(CATEGORY).includes(category)) {
        throw new Error("A categoria informada não existe");
      }

      await db("products").update({ category: category }).where({ id: id });
    }

 res.status(200).send({ mensagem: "Produto atualizado com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("erro inesperado");
    }
  }
};
