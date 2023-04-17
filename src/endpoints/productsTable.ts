/* import { db } from "../database/knex";

export const createProductsTable = async () => {
  try {
    const exists = await db.schema.hasTable("products");
    if (!exists) {
      await db.schema.createTable("products", (table) => {
        table.text("id").primary().unique().notNullable();
        table.text("name").notNullable();
        table.decimal("price", 12, 2).notNullable();
        table.text("description").notNullable();
        table.text("image_url").notNullable();
        table.enu("category", ["Acessórios", "Roupas e calçados", "Eletrônicos"]).notNullable();
      });
      console.log("Tabela de produtos criada com sucesso!");
    }
  } catch (error) {
    console.log("Erro ao criar tabela de produtos:", error);
  }
};

const products = [
  {
    id: "p001",
    name: "Fone de Ouvido Bluetooth",
    price: 129.99,
    category: "Acessórios",
    description: "Fone de ouvido sem fio com microfone",
    imageUrl: "https://example.com/fone-de-ouvido-bluetooth.jpg",
  },
  {
    id: "p002",
    name: "Tênis Esportivo",
    price: 249.99,
    category: "Roupas e calçados",
    description: "Tênis para corrida e atividades físicas",
    imageUrl: "https://example.com/tenis-esportivo.jpg",
  },
  {
    id: "p003",
    name: "Smartphone Android",
    price: 799.99,
    category: "Eletrônicos",
    description: "Smartphone com sistema operacional Android",
    imageUrl: "https://example.com/smartphone-android.jpg",
  },
  {
    id: "p004",
    name: "Mochila para Notebook",
    price: 189.99,
    category: "Acessórios",
    description: "Mochila para notebook de até 15 polegadas",
    imageUrl: "https://example.com/mochila-para-notebook.jpg",
  },
  {
    id: "p005",
    name: "Camisa Polo",
    price: 89.99,
    category: "Roupas e calçados",
    description: "Camisa polo casual para uso diário",
    imageUrl: "https://example.com/camisa-polo.jpg",
  },
];

export const populateProductsTable = async () => {
  try {
    await db("products").insert(products);
    console.log("Tabela de produtos populada com sucesso!");
  } catch (error) {
    console.error("Erro ao popular tabela de produtos:", error);
  }
};

 */