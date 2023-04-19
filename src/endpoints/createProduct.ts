import { Request, Response } from "express";
import { TProduct } from "../types";
import { db } from "../database/knex";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, price, category, description, image_url } = req.body;

    if (!id || !name || !price) {
      return res.status(400).send("ID, nome e preço são obrigatórios");
    }

    if (typeof id !== "string") {
      throw new Error("ID deve ser uma string");
    }

    if (typeof name !== "string") {
      throw new Error("O nome deve ser uma string");
    }

    if (typeof price !== "number") {
      throw new Error("O preço deve ser um número");
    }

    const [productIdAlreadyExists]: TProduct[] | undefined[] = await db(
      "products"
    ).where({ id });

    if (productIdAlreadyExists) {
      res.status(400);
      throw new Error("O ID já existe");
    }

    const [productNameAlreadyExists]: TProduct[] | undefined[] = await db(
      "products"
    ).where({ name });

    if (productNameAlreadyExists) {
      res.status(400);
      throw new Error("O nome já foi cadastrado");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
      description,
      image_url
    };

    await db("products").insert(newProduct);

    res.status(201).send({
      message: "Produto criado com sucesso",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
