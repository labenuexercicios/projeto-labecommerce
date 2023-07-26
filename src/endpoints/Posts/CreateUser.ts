import { Request, Response } from "express"
import { TUser } from "../../types"
import { db } from "../../knex";


export const createUser = async (req: Request, res: Response) => {

    const { id, name, email, password } = req.body

    try {

        for (const key in req.body) {
            if (req.body[key as keyof TUser] === undefined) {
                res.status(400)
                throw new Error(`Informe todos os campos`)
            }
        }

        if (typeof id !== "string" || typeof name !== "string" ||
            typeof email !== "string" || typeof password !== "string") {
            res.status(400)
            throw new Error("Por favor, preencha com strings os campos que pedem esse formato.")
        }

        if (password.length < 6) {
            throw new Error('A senha precisa ter no mínimo 6 caracteres')
        }

        if (!id.includes("u") && id.length < 4) {
            res.status(400)
            throw new Error("Por favor, insira um id no formato válido (u + número do usuário). Mínimo de 4 caracteres.")
        }

        if (!email.includes("@") && email.length < 11) {
            res.status(400)
            throw new Error("Por favor, insira um e-mail válido. Mínimo de 11 caracteres.")
        }

        const [existedID] = await db("users").where({ id: id });
        if (existedID) {
            res.status(400)
            throw new Error("Id já cadastrado.");
        }

        const [existedEmail] = await db("users").where({ email: email });
        if (existedEmail) {
            res.status(400);
            throw new Error("Email já cadastrado.");
        }


        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            created_at: new Date().toISOString()
        }
        const result = await db("users").insert(newUser)

        res.status(200).send({ message: "Usuário cadastrado com sucesso." })
    }

    catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.status(400).send(error.message)
        }
        res.status(500).send("Erro desconhecido, faça uma nova requisição.")
    }
}
