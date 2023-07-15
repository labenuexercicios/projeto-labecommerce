//import { users, products } from "./database/mockdatabase"
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { TProducts, TUsers, TPurchases } from "./types";

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
    const result = await db("users");
    res.status(200).send(result);
  } catch (error) {
    console.log("ERRO!", error);
    res.status(500).send("Internal Server Error");
  }
});

//Create User:

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    // Verify required field:
    if (!id || !name || !email || !password) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    }
    const newUser: TUsers = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Create Product:

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, image_url } = req.body;

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      image_url,
    };
    await db("products").insert(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Get All Products:

app.get("/products", async (req: Request, res: Response) => {
  try {
    const name = req.query.name;

    if (name !== undefined) {
      if (name.length === 0) {
        res
          .status(404)
          .send("O nome deve ser uma string com pelo menos um caractere!");
        return;
      }
    }
    let result;
    if (name) {
      result = await db("products").where("name", "like", `%${name}%`);
      if (result.length === 0) {
        res.status(404).send("Produto não encontrado...");
        return;
      }
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

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.image_url as string | undefined;

    const [product] = await db("products").where({ id: idToEdit });

    if (product) {
      await db
        .update({
          id: newId || product.id,
          name: newName || product.name,
          price: newPrice || product.price,
          description: newDescription || product.description,
          image_url: newImageUrl || product.imageUrl,
        })
        .from("products")
        .where({ id: idToEdit });
      res.status(200).send("Produto atualizado com sucesso!");
    } else {
      res.status(404).send("Produto não encontrado...");
    }
  } catch (error) {
    console.log("ERRO!", error);
    res.status(500).send("Internal Server Error");
  }
});

//Create Purchase:

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, products } = req.body;
    let total_price = 0;

    for (let product of products) {
      const [productExists] = await db("products").where({ id: product.id });
      total_price = total_price + productExists.price * product.quantity;
    }

    const newPurchase: TPurchases = {
      id,
      buyer,
      total_price,
    };
    await db("purchases").insert(newPurchase);

    for (let product of products) {
      const newPurchaseProduct = {
        purchase_id: id,
        product_id: product.id,
        quantity: product.quantity,
      };
      await db("purchases_products").insert(newPurchaseProduct);
    }
    res.status(201).send("Pedido realizada com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Get Purchase by ID:

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db('purchases as p')
      .select({
        purchaseId: 'p.id',
        buyerId: 'u.id',
        buyerName: 'u.name',
        buyerEmail: 'u.email',
        totalPrice: 'p.total_price',
        createdAt: 'p.created_at',
        productId: 'pr.id',
        productName: 'pr.name',
        productPrice: 'pr.price',
        productDescription: 'pr.description',
        productImageUrl: 'pr.image_url',
        productQuantity: 'pp.quantity'
      })
      .where('p.id', id)
      .innerJoin('users as u', 'u.id', 'p.buyer')
      .innerJoin('purchases_products as pp', 'pp.purchase_id', 'p.id')
      .innerJoin('products as pr', 'pr.id', 'pp.product_id');

      if (!result.length) {
        res.status(404).send("Pedido não encontrado...");
        return;
      }

      const response = {
        purchaseId: result[0].purchaseId,
        buyerId: result[0].buyerId,
        buyerName: result[0].buyerName,
        buyerEmail: result[0].buyerEmail,
        totalPrice: result[0].totalPrice,
        createdAt: result[0].createdAt,
        products: result.map(product => ({
          id: product.productId,
          name: product.productName,
          price: product.productPrice,
          description: product.productDescription,
          imageUrl: product.productImageUrl,
          quantity: product.productQuantity
        }))
      }

    res.status(200).send(response);
  } catch (error) {
    console.log("ERRO!", error);
    res.status(500).send("Internal Server Error");
  }
});


//Delete Purchase by ID:

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const [purchase] = await db("purchases").where({ id: idToDelete });
    if (!purchase) {
      res.status(404).send("Pedido não encontrado...");
      return;
    }
    await db("purchases").del().where({ id: idToDelete });
    res.status(200).send("Pedido cancelado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Delete User by ID:

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const [user] = await db("users").where({ id: idToDelete });
    if (!user) {
      res.status(404).send("User não encontrado...");
      return;
    }
    await db("users").del().where({ id: idToDelete });
    res.status(200).send("User apagado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});

//Delete Product by ID:

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const [product] = await db("products").where({ id: idToDelete });
    if (!product) {
      res.status(404).send("Produto não encontrado...");
      return;
    }
    await db("products").del().where({ id: idToDelete });
    res.status(200).send("Produto apagado com sucesso!");
  } catch (error) {
    console.log("ERRO!");
    res.status(500).send("Internal Server Error");
  }
});
