import { Request, Response } from "express"
import { TUser } from "../../types"
import { db } from "../../knex";


export const createUser = async (req: Request, res: Response) => {

    const { id, name, email, password } = req.body

    try {
        const result = await db.raw(
            `INSERT INTO users (id, name, email, password, created_at)
            VALUES("${id}", "${name}", ${email}", "${password}", DATETIME ('now'))
            WHERE NOT EXISTS (
                SELECT email FROM users 
                WHERE email='${email}'
            ) AND (
                SELECT id FROM users 
                WHERE id ='${id}'
            )
            LIMIT 1;`
            )

            for (const key in req.body) {
                if (req.body[key as keyof TUser] === undefined) {
                    throw new Error(`Informe todos os campos`)
                }
            }
    
            if (typeof id !== "string") {
                throw new Error("O id precisa ser uma string")
            }
            if (password.length < 6) {
                throw new Error('A senha precisa ter no mínimo 6 caracteres')
            }
    
            res.status(200).send(result)
            res.status(201).send({ message: "Conta criada com sucesso:"})
    } catch (error:any) {
        if (error instanceof Error) {
          res.send(error.message)
        } 
          res.status(500).send("Erro desconhecido")
    }
}
