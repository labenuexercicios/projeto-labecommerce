import { Request, Response } from "express";
import { db } from "../database/knex";

export const searchProductsByName =  async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string)?.toLowerCase();

    if (!q || q.length < 1) {
      res.status(400);
      throw new Error("Query params deve possuir pelo menos 1 caracter!");
    }

    const result = await db
      .select("*")
      .from("products")
      .where("name", "like", `%${q}%`);

    if (result.length === 0) {
      res.status(404);
      throw new Error("Nenhum produto encontrado!");
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
