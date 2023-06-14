import { Request, Response } from "express";
import { accounts } from "../database";

export const deleteAccount = (req:Request, res:Response) => {
  const { id } = req.params
  const accountIndex = accounts.findIndex(element => element.id === id)

  if (accountIndex >= 0) {
      accounts.splice(accountIndex, 1)
  } else {
      res.status(404).send("Element Not Found")
      // throw new Error("Element Not Found");
  }

  res.status(200).send("Account Deleted")
}