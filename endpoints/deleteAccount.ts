import { Request, Response } from "express";
import { users } from "../database";

export const deleteAccount = (req:Request, res:Response) => {
  const { id } = req.params
  const userIndex = users.findIndex(element => element.id === id)

  if (userIndex >= 0) {
    users.splice(userIndex, 1)
  } else {
      res.status(404).send("Element Not Found")
      // throw new Error("Element Not Found");
  }

  res.status(200).send("Account Deleted")
}