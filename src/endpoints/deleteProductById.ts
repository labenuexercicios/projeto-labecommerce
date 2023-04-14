import { Request, Response } from "express";
import { db } from "../database/knex";

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedRows = await db("products")
      .where({ id })
      .del();

    if (deletedRows > 0) {
      res.status(200).send({
        message: "Produto excluído com sucesso"
      });
    } else {
      res.status(404).send({
        message: "Produto não encontrado"
      });
    }
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
