import { Request, Response } from "express"
import { db } from "../../knex";

export const editUserById = async (req: Request, res: Response) => {

    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newEmail = req.body.email as number | undefined
    const newPassword = req.body.password as string | undefined

    try {
        const [user] = await db.select("*").from("users").where({ id: id })

        await db.update({
            id: user.id,
            name: newName || user.name,
            email: newEmail || user.email,
            password: newPassword || user.password,
        }).from("users").where({ id: id })

        if (!user) {
            res.status(400)
            throw new Error("Usuário não encontrado, id inválido.")
        }

        res.status(200).send({ message: "Usuário atualizado com sucesso!" })

    } catch (error: any) {
        if (error instanceof Error) {
            res.status(400).send("Não foi possível realizar as alterações, faça uma nova requisição.")
        }
        res.status(500).send("Erro desconhecido.")
    }
}
