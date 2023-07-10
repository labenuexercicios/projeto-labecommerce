import { users, products } from "./database/database";
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { TProducts, TUsers } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

//Get All Users:

app.get("/users", async (req: Request, res: Response) => {
  try {
    /* const result = await db.raw(`
    SELECT * FROM users;
    `) */ //método Raw
    const result = await db("users"); //método Querry Builder
    res.status(200).send(result);
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Create User:

app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;
    const newUser: TUsers = {
      id,
      name,
      email,
      password,
    };
    users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Create Product:

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;
    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };
    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Get All Products:

app.get("/products", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let result;
    if (name) {
      result = await db("products").where("name", "like", `%${name}%`);
    } else {
      result = await db("products");
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("ERRO!", error);
    res.status(500).send("Internal Server Error");
  }
});

//Edit Product by ID:

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.Name as string | undefined;
    const newPrice = req.body.balance as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const product = products.find((product) => product.id === id);

    if (product) {
      product.id = newId || product.id;
      product.name = newName || product.name;
      product.price = newPrice || product.price;
      product.description = newDescription || product.description;
      product.imageUrl = newImageUrl || product.imageUrl;
    }
    res.status(200).send("Produto atualizado com sucesso!");
  } catch (error) {
    console.log("ERRO!", error);
    res.status(500).send("Internal Server Error");
  }
});

//Create Purchase:          (POST)

//Get Purchase by ID:       (GET)

//Delete Purchase by ID:        (DELETE)

//Delete User by ID:

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      users.splice(userIndex, 1);
    }
    res.status(200).send("User apagado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Delete Product by ID:

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});
