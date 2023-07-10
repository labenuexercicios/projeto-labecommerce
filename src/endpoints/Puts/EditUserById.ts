import { Request, Response } from "express"
import { db } from "../../knex";

export const editUserById = async (req: Request, res: Response) => {

    const { id } = req.params

    const newName = req.body.name as string | undefined
    const newEmail = req.body.email as number | undefined
    const newPassword = req.body.password as string | undefined
    const lastUpdate = new Date().toISOString()

    try {
        const [user] = await db.select("*").from("users").where({ id: id })

        await db.update({
            id: user.id,
            name: newName || user.name,
            email: newEmail || user.email,
            password: newPassword || user.password,
            lastUpdate: lastUpdate
        }).from("users").where({ id: id })

        res.status(200).send("Usuário atualizado com sucesso!")

    } catch (error: any) {
        if (error instanceof Error) {
            res.status(400).send("Insira um login válido.")
        }
        res.status(500).send("Erro desconhecido, faça uma nova requisição.")
    }
}
