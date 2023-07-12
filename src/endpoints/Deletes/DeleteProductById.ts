import { Request, Response } from "express";
import { db } from "../../knex";

export const deleteProductById = async (req: Request, res: Response) => {

  const id = req.params.id

  try {
    const result = await db("products")
      .delete()
      .where("id", "=", `${id}`)


    if (!result) {
      res.status(400)
      throw new Error("Insira um id válido.")
    }


    res.status(200).send({ message: "Produto deletado com sucesso" })

  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.status(400).send("Insira um Id válido.")
    } res.status(500).send("Erro desconhecido, faça uma nova requisição.")
  }
}

