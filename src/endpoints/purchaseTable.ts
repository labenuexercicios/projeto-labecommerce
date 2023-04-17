/* import { db } from "../database/knex";
export const createPurchasesTable = async () => {
  try {
    const exists = await db.schema.hasTable("purchases");
    if (!exists) {
      await db.schema.createTable("purchases", (table) => {
        table.text("id").primary().unique().notNullable();
        table.float("total_price").notNullable();
        table.integer("paid").notNullable().defaultTo(0);
        table.text("buyer").notNullable().references("users.id");
        table
          .text("created_at")
          .notNullable()
          .defaultTo(db.raw(`datetime('now', 'localtime')`));
      });
    }
  } catch (error) {
    console.log(error);
  }
};
 */