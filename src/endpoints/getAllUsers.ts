import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
      const searchTerm = req.query.q as string | undefined

      if (searchTerm === undefined) {
          const result = await db("users")
          res.status(200).send(result)
      } else {
          const result = await db("users").where("name", "LIKE", `%${searchTerm}%`)
          res.status(200).send(result)
      }
  } catch (error) {
      console.log(error)

      if (res.statusCode === 200) {
          res.status(500)
      }

      if (error instanceof Error) {
          res.send(error.message)
      } else {
          res.send("Erro inesperado")
      }
  }
}
