import { Request, Response } from "express"
import { products } from "../../database/database"
import { db } from "../../knex";

export const editProductById = (req:Request, res:Response) => {
  const id = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription = req.body.description as string | undefined
  const newImage_url = req.body.image_url as string | undefined


  if (newId) {
      const product = products.find(element => element.id === newId)
      if (product) {
          res.status(409).send(`ID: "${newId}" already exists`)
          // throw new Error(`ID: "${newId}" already exists`);
      }
  }
  const product = products.find(element => element.id === id)

  if (product) {
      product.id = newId || product.id
      product.name = newName || product.name
      product.price = newPrice || product.price
      product.description = newDescription || product.description
      product.image_url = newImage_url || product.image_url
  }

  res.status(200).send("Successfully updated account")
}