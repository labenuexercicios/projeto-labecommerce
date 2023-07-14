import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// Get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

// Create user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, createdAt } = req.body;

    const user = {
      id: id,
      name: name,
      email: email,
      password: password,
      created_at: createdAt,
    };

    await db("users").insert(user);
    res.status(201).send({ message: "Cadastro realizado com sucesso" });
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

// Get all products
app.get("/products", async (req: Request, res: Response) => {
  try {
    console.log(req.query.name);
    const name = req.query.name;
    if (name === undefined) {
      const result = await db("products");
      res.status(200).send(result);
    } else {
      const result = await db("products").whereLike("name", `%${name}%`);
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

// Create product
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    const product = {
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: imageUrl,
    };

    await db("products").insert(product);
    res.status(200).send({ message: "Produto cadastrado com sucesso" });
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

// Edit Product by id
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idProduct = req.params.id;
    const { name, price, description, imageUrl } = req.body;
    const product = {
      name: name,
      price: price,
      description: description,
      image_url: imageUrl,
    };

    await db("products").update(product).where({ id: idProduct });
    res.status(200).send({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

// Get purchase by id
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await db("purchases").whereLike("id", `%${id}%`);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

// Create purchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, products, createdAt } = req.body;
    let totalPrice = 0.0;
    products.forEach(async (prod: any) => {
      console.log("Adicionando produto " + prod.id);
      const res = await db("products").where({ id: prod.id });
      console.log(res);
      totalPrice += res[0].price * prod.quantity;
      console.log("Total price " + totalPrice);
    });

    const purchase = {
      id: id,
      buyer: buyer,
      total_price: totalPrice,
      created_at: createdAt,
    };

    await db("purchases").insert(purchase);
    res.status(201).send({ message: "Pedido realizado com sucesso" });
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

// Delete purchase by id
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // const result = await db("purchases").whereLike("id", `%${id}%`);
    await db("purchases").del().where({ id: id });
    res.status(200).send({ message: "Pedido cancelado com sucesso" });
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});
