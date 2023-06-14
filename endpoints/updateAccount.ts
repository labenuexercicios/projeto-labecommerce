import { Request, Response } from "express"
import { ACCOUNT_TYPE } from "../types"
import { accounts } from "../database"

export const updateAccount = (req:Request, res:Response) => {
  const id = req.params.id

  const newId = req.body.id as string | undefined
  const newOwnerName = req.body.ownerName as string | undefined
  const newBalance = req.body.balance as number | undefined
  const newType = req.body.type as ACCOUNT_TYPE | undefined

  if (newId) {
      const account = accounts.find(element => element.id === newId)
      if (account) {
          res.status(409).send(`ID: "${newId}" already exists`)
          // throw new Error(`ID: "${newId}" already exists`);
      }
  }
  const account = accounts.find(element => element.id === id)

  if (account) {
      account.id = newId || account.id
      account.ownerName = newOwnerName || account.ownerName
      account.type = newType || account.type
      account.balance = isNaN(newBalance) ? account.balance : newBalance
  }

  res.status(200).send("Successfully updated account")
}