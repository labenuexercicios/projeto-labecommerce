import express, { Request, Response} from "express";
import cors from "cors";
import { TProducts } from "./types";
import { db } from "./database/knex";

const app = express();
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

app.get("/ping", async (req: Request, res: Response) => {
  try {
      res.status(200).send("Pong!")
  } catch (error) {
      console.log(error)

      if (res.statusCode === 200) {
          res.status(500)
      }
      
      if (error instanceof Error) {
          res.send(error.message)
      } else {
          res.send("Erro inesperado")
      }
  }
})

app.get("/users", async(req: Request, res: Response) => {
    try {
      const result = await db("users")
      res.status(200).send(result)
    } catch(error: any) {
      res.status(400).send(error.message)
    }
})

app.get("/product", async(req: Request, res: Response) => {
  try {
    let quer = db.select('*').from('products');
    const nameProduct = req.params.name
    
    if (nameProduct && nameProduct.length >= 1) {
      quer = quer.where('name', 'like', `%${nameProduct}%`)
    }

    const products: TProducts[] = await quer
    res.status(200).send(products)
  } catch(error: any) {
    res.status(400).send(error.message)
  }
})

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await db.select('*').from('products').where('id', productId).first();
    if (!product) {
      throw new Error('Produto com o ID fornecido não existe.');
    }

    res.status(200).json(product);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const purchases = await db.select('*').from('purchases');
    res.status(200).json(purchases);
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Erro ao buscar compras.");
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const purchase = await db.select('*').from('purchases').where('id', purchaseId).first();
    if (!purchase) {
      throw new Error('Compra com o ID fornecido não existe.');
    }

    res.status(200).json(purchase);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

app.post("/users", async(req: Request, res: Response) => {
  try {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    
    if (typeof id !== "string") {
      throw new Error("id deve ser uma string")
    }
    const existingUser = await db.select('*').from('users').where('id',id).orWhere('email',email).first();
    if (existingUser) {
      throw new Error('Usuário com o mesmo ID ou email já existe.');
    }

    if (typeof name !== "string") {
      throw new Error("name deve ser uma string")
    }

    if (typeof email !== "string") {
      throw new Error("email deve ser uma string")
    }

    if (typeof password !== "string") {
      throw new Error("password deve ser uma string")
    }

    const newUser = {id, name, email, password}
    await db('users'). insert(newUser)
    res.status(200).send("Cadastro realizado com sucesso")
  } catch (error: any) {
    console.log(error)
    res.status(400).send(error.message)
  }

})

app.post("/products", async(req: Request, res: Response) => {
  try {
    const id = req.body.id 
    const name = req.body.name 
    const price = req.body.price 
    const description = req.body.description 
    const image_url = req.body.image_url 

    if (typeof id !== "string") {
      throw new Error("id deve ser uma string")
    }
    const existingProduct = await db.select('*').from('products').where('id',id).first();
    if (existingProduct) {
      throw new Error('Produto com o mesmo ID já existe.');
    }

    if (typeof name !== "string") {
      throw new Error("name deve ser uma string")
    }
    if (typeof price !== "number") {
      throw new Error("price deve ser um number")
    }
    if (typeof description !== "string") {
      throw new Error("description deve ser uma string")
    }
    if (typeof image_url !== "string") {
      throw new Error("image deve ser uma string")
    }

    const newProduct = {id, name, price, description, image_url}
    await db('products').insert(newProduct)
    res.status(200).send("Produto cadastrado com sucesso")
  } catch (error: any) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const buyer = req.body.buyer
    const total_price = req.body.total_price

    const existingBuyer = await db.select('*').from('users').where('id', buyer).first();
    if (!existingBuyer) {
      throw new Error('Comprador com o ID fornecido não existe.');
    }

    const newPurchase = { id, buyer, total_price };
    await db('purchases').insert(newPurchase);

    res.status(200).send("Compra criada com sucesso");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});


app.delete("/users/:id", async(req: Request, res: Response) => {
  try {
    const idUser = req.params.id
    const user = await db.select('*').from('users').where('id', idUser).first();

    if (!user) {
      throw new Error('Usuário com o ID fornecido não existe.');
    }

    await db('users').where('id', idUser).del()
    res.status(200).send("User apagado com sucesso")
  } catch (error: any) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

app.delete("/products/:id", async(req: Request, res: Response) => {
  try {
    const idProduct = req.params.id
    const product = await db.select('*').from('products').where('id', idProduct).first();
  
    if (!product) {
      throw new Error('Usuário com o ID fornecido não existe.');
    } 
   
    await db('products').where('id', idProduct).del()
    res.status(200).send("Produto apagado com sucesso")
  } catch (error: any) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const purchase = await db.select('*').from('purchases').where('id', purchaseId).first();
    if (!purchase) {
      throw new Error('Compra com o ID fornecido não existe.');
    }

    await db('purchases').where('id', purchaseId).del();
    res.status(200).send("Compra apagada com sucesso");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

app.put("/products/:id", async(req: Request, res: Response) => {
  try {
    const idEdit = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.image_url as string | undefined

    const existProduct = await db.select('*').from('products').where('id', idEdit).first();
    if (!existProduct) {
      throw new Error('Produto com o ID fornecido não existe.');
    }

    await db('products').where('id', idEdit).update({ 
      id: newId,
      name: newName,
      price: newPrice,
      description: newDescription,
      image_url: newImageUrl
     });

    res.status(200).send("Produto atualizado com sucesso")
  } catch (error: any) {
    console.log(error)
    res.status(400).send(error.message)
  }
  
})