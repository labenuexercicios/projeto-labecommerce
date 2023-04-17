/* import { db } from "../database/knex";

export const createUsersTable = async () => {
  try {
    const exists = await db.schema.hasTable('users');
    if (!exists) {
      await db.schema.createTable('users', (table) => {
        table.text('id').primary().unique().notNullable();
        table.text('name').notNullable();
        table.text('email').unique().notNullable();
        table.text('password').notNullable();
        table.text('created_at').notNullable().defaultTo(db.raw(`datetime('now', 'localtime')`));
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const users = [
  {
    id: "u001",
    name: "clara ferreira batista",
    email: "clara@gmail.com",
    password: "Clara123*",
  },
  {
    id: "u002",
    name: "carlos e abade",
    email: "carlos@gmail.com",
    password: "Carlos123*",
  },
];

export const populateUsersTable = async () => {
  try {
    await db("users").insert(users);
    console.log("Tabela de usuários populada com sucesso!");
  } catch (error) {
    console.error("Erro ao popular tabela de usuários:", error);
  }
}; */