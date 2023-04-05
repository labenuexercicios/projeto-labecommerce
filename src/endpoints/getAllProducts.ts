import { Request, Response } from "express";
import { products } from "../database";

export const getAllProducts = (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Produtos cadastrados", products });
  } catch (error:any) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).send("Ocorreu um erro ao buscar os produtos");
  }
};
