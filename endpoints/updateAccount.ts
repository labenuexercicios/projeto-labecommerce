import { Request, Response } from "express"
import { users } from "../database"

export const updateAccount = (req:Request, res:Response) => {
  const id = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.passsword as string | number| undefined
  const newDate = req.body.created_at as Date | undefined


  if (newId) {
      const user = users.find(element => element.id === newId)
      if (user) {
          res.status(409).send(`ID: "${newId}" already exists`)
          // throw new Error(`ID: "${newId}" already exists`);
      }
  }
  const user = users.find(element => element.id === id)

  if (user) {
        user.id = newId || user.id
        user.name = newName || user.name
        user.email = newEmail || user.email
        user.password = newPassword || user.password
        user.created_at = newDate || user.created_at
  }

  res.status(200).send("Successfully updated account")
}