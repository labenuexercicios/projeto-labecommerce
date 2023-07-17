import express, { Request, Response } from "express";
import cors from "cors";

import { PurchaseData,PurchaseProducts } from "./types";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});
//Ver todos os usuarios
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});
app.post("/user", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!id || !name || !email) {
      res.status(400);
      throw new Error("Dados Invalidos");
    }

    await db
      .insert({
        id: id,
        name: name,
        email: email,
        password: password,
      })
      .into("users");
    res.status(200).send({ message: "Cadastro Realizado com sucesso" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const image_url = req.body.image_url as string;
    if (!id || !name || isNaN(price) || !description || !image_url) {
      res.status(400);
      throw new Error("Dados Invalidos");
    }

    await db
      .insert({
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url,
      })
      .into("products");
    res.status(200).send({ message: "Produto cadastrado com sucesso" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");
    res.status(200).send(result);
  } catch (error) {
    res.send(400).send(error);
  }
});
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const [products] = await db
      .select("*")
      .from("products")
      .where({ name: name });

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});




app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;
    console.log('idToEdit:', idToEdit);

    const newId = req.body.id;
    console.log('newId:', newId);
    const newName = req.body.name;
    console.log('newName:', newName);
    const newPrice = req.body.price;
    console.log('newPrice:', newPrice);
    const newDescription = req.body.description;
    console.log('newDescription:', newDescription);
    const newImage = req.body.image_url;
    console.log('newImage:', newImage);

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser um number");
      }
      if (newId.length < 1) { 
        res.status(400);
        throw new Error("'id' deve possuir no mínimo um caracter");
      }
    }
    
    const [product] = await db("products").where({ id: idToEdit });
    if (product) {
      const updateProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: isNaN(newPrice) ? product.price : newPrice,
        description: newDescription || product.description,
        image_url: newImage || product.imageUrl,
      };
      await db("products").where({ id: idToEdit }).update(updateProduct);
    } else {
      res.status(404);
      throw new Error("'id' não encontrado");
    }
    res.status(200).send("Atualização realizada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(400).send("erro");
  }
});




/* app.post("/purchase", async (req: Request, res: Response) => {
  try {
    const { id, buyer, products } = req.body;

    if (id == undefined || typeof id != "string" || id.length < 1) {
      res.status(400);
      throw new Error(`'id' is requerid, need to be the string type
          and must heave at least one character`);
    }
    if (buyer == undefined || typeof buyer != "string" || buyer.length < 1) {
      res.status(400);
      throw new Error(`'buyer' is requirid, need to be the string type
          and must heave at least one character`);
    }
    if (products == undefined || products.length < 1) {
      res.statusCode = 400;
      throw new Error("incomplete purchase, missing products");
    }

    const productsFromDb = [];

    for (let product of products) {
      const [result] = await db("products").where({ id: product.id });
      if (!result) {
        throw new Error(`Produto ${product.id} nao encontrado`);
      }
      productsFromDb.push(result);
    }

    // cria o objeto da nova compra
    const newPurchase: PurchaseData = {
      id: id,
      buyer: buyer,
      total_price: productsFromDb.reduce(
        (accumulator, current) => accumulator + current.price,
        0
      ),
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    // criar o objeto do produtos
    const newPurchaseProducts: PurchaseProducts[] = [];

    for (let product of products) {
      const newProduct: PurchaseProducts = {
        product_id: product.id,
        purchase_id: id,
        quantity: product.quantity,
      };
      newPurchaseProducts.push(newProduct);
    }
    // salva do banco de dados a compra
    await db("purchases").insert(newPurchase);
    await db("purchases_products").insert(newPurchaseProducts);

    res.status(201).send({ message: "Pedido realizado com sucesso" });
  } catch (error: any) {
    res.status(400).send({ error: error.message || JSON.stringify(error) });
  }
}); */
app.post("/purchase", async (req: Request, res: Response) => {
  try {
    console.log("Request received.");

    const { id, buyer, products } = req.body;
    console.log("id:", id);
    console.log("buyer:", buyer);
    console.log("products:", products);

    if (id == undefined || typeof id != "string" || id.length < 1) {
      res.status(400);
      console.log("'id' validation failed.");
      throw new Error(`'id' is required, needs to be of string type, and must have at least one character`);
    }
    if (buyer == undefined || typeof buyer != "string" || buyer.length < 1) {
      res.status(400);
      console.log("'buyer' validation failed.");
      throw new Error(`'buyer' is required, needs to be of string type, and must have at least one character`);
    }
    if (products == undefined || products.length < 1) {
      res.status(400);
      console.log("'products' validation failed.");
      throw new Error("Incomplete purchase, missing products");
    }

    const productsFromDb = [];

    for (let product of products) {
      console.log("Fetching product from the database with id:", product.id);
      const [result] = await db("products").where({ id: product.id });
      if (!result) {
        console.log(`Product ${product.id} not found`);
        throw new Error(`Product ${product.id} not found`);
      }
      productsFromDb.push(result);
    }

    // Create the new purchase object
    const newPurchase: PurchaseData = {
      id: id,
      buyer: buyer,
      total_price: productsFromDb.reduce(
        (accumulator, current) => accumulator + current.price,
        0
      ),
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    // Create the purchase products object
    const newPurchaseProducts: PurchaseProducts[] = [];

    for (let product of products) {
      const newProduct: PurchaseProducts = {
        product_id: product.id,
        purchase_id: id,
        quantity: product.quantity,
      };
      newPurchaseProducts.push(newProduct);
    }

    // Save the purchase in the database
    console.log("Saving the purchase to the database.");
    await db("purchases").insert(newPurchase);
    await db("purchases_products").insert(newPurchaseProducts);

    console.log("Purchase successfully saved.");
    res.status(201).send({ message: "Pedido realizado com sucesso" });
  } catch (error: any) {
    console.log("Error occurred:", error.message || JSON.stringify(error));
    res.status(400).send({ error: error.message || JSON.stringify(error) });
  }
});





app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    console.log('idToDelete:', idToDelete);

   

    console.log('purchase:');

    

    console.log('Deleting purchase...');
    await db("purchases_products").where("purchase_id", idToDelete).del();
    await db("purchases").del().where({ id: idToDelete });


    console.log('Purchase deleted.');

    res.status(200).send({ message: "Compra Deletado" });
  } catch (error) {
    console.error(error);
  }
});






app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idSearch = req.params.id;

    console.log('idSearch:', idSearch);

    const [resultPurchase] = await db
      .select(
        "purchases.id AS IDCompra",
        "purchases.buyer AS IDComprador",
        "users.name AS Cliente",
        "users.email AS EmailUsuario",
        "purchases.total_price AS ValorTotal",
        "purchases.created_at AS DataDaCompra"
      )
      .from("purchases")
      .innerJoin("users", "purchases.buyer", "=", "users.id")
      .where("purchases.id", "=", idSearch);

    console.log('resultPurchase:', resultPurchase);

    const resultPurchaseProducts = await db
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url AS imageUrl",
        "purchases_products.quantity"
      )
      .from("purchases_products")
      .innerJoin("products", "product_id", "products.id")
      .where("purchase_id", "=", idSearch);

    console.log('resultPurchaseProducts:', resultPurchaseProducts);

    const result = {
      ...resultPurchase,
      products: resultPurchaseProducts,
    };

    console.log('result:', result);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});



