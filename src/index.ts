import express, { Request, Response } from 'express'
import cors from 'cors';
import { products, purchases, users } from './database';
import { TProduct, TUser, CATEGORY, TPurchase } from './types';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
})

app.post("/users", (req: Request, res: Response) => {
  const { id, email, password } = req.body

  if (typeof id !== "string") {
    return res.status(400).send("ID tem que ser string");
  }
  if (typeof email !== "string") {
    return res.status(400).send("E-mail tem que ser string");
  }
  if (typeof password !== "string") {
    return res.status(400).send("A senha tem que ser string");
  }

  const existingUserById = users.find(user => user.id === id);

  if (existingUserById) {
    res.status(400).send("Não é possível criar mais de uma conta com a mesma id.");
    return;
  }
  const existingUserByEmail = users.find(user => user.email === email);

  if (existingUserByEmail) {
    res.status(400).send("Não é possível criar mais de uma conta com o mesmo e-mail.");
    return;
  }

  const newUser: TUser = { id, email, password };
  users.push(newUser);
  res.status(201).send({ message: "Cadastro realizado com sucesso", newUser });

})

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send({message:"Lista de produtos atualizada", products});
})

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, category } = req.body

  if (typeof id !== "string") {
    return res.status(400).send("id tem que ser string")
  }
  if (typeof price !== "number") {
    return res.status(400).send("O preço tem que ser number")

  }
  if (typeof name !== "string") {
    return res.status(400).send("O nome tem que ser string")
  }

  const productIdFound = products.find((product) => product.id === id);
  if (productIdFound) {
    return res.status(400).send("ID de produto já cadastrado");
  }
  const productNameFound = products.find((product) => product.name === name);
  if (productNameFound) {
    return res.status(400).send("O nome do produto já cadastrado");
  }


  const newProduct: TProduct = { id, name, price, category };
  products.push(newProduct);
  res.status(201).send({ message: "Produto criado com sucesso", newProduct });
})




