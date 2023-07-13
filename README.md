# Labecommerce API

A Labecommerce API faz parte do projeto de pilares do back-end, conteúdo ministrado pela escola de programação "Labenu". Trata-se de uma simples API de lanchonete, contendo uma lista de usuários, cardápio de produtos e registros de compras. Através do Knex, a API retira suas informações pelo consumo de um banco de dados moldado em SQLite. Através do ID registrado, é permitido criar e editar novos usuários, produtos, e registrar novas compras. Também é possível deletar qualquer informação da API através do ID.

O usuário poderá acessar a documentação desta API no Postman através deste [link](https://documenter.getpostman.com/view/26594506/2s946chaKj).

### Conteúdos abordados
- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

## Banco de dados 🎲🎲

O banco de dados contém quatro tabelas com as seguintes colunas:

### users 🙍🙆
- id
- name
- email
- password
- created_at
##
### products 🛒🛒
- id 
- name
- price
- description
- image_url
##
### purchases 💸💸
- id 
- buyer
- total_price
- created_at
##
### purchases_products 🧾🧾
- purchase_id
- product_id
- quantity
##

#### Modelagem do banco de dados. 

As relações entre as tabelas, tal como a tipagem de suas colunas foram elaboradas da seguinte maneira:

![image](https://github.com/labenuexercicios/projeto-labecommerce/assets/29845719/b446bbb0-bc9c-42d9-be04-b9ce1d605bd4)

###

# Lista de endpoints

<img src="https://i.ibb.co/wQ3xjPq/image.png" alt="endpoints"></img>


## Get all users
Retorna todas as pessoas cadastradas.<br>
```typescript
// Request
// GET /users

// Response
// status 200 OK
[
   
    {
        "id": "u001",
        "name": "Mary Christmas",
        "email": "marychristmas@email.com",
        "password": "mypassword1",
        "created_at": "2023-07-11 22:40:23"
    },
    {
        "id": "u002",
        "name": "Jungle Jim",
        "email": "junglejim@email.com",
        "password": "mypassword2",
        "created_at": "2023-07-11 22:40:23"
    },
    {
        "id": "u003",
        "name": "Suzi Snoozie",
        "email": "suzisnoozie@email.com",
        "password": "mypassword3",
        "created_at": "2023-07-11 22:40:23"
    },
    {
        "id": "u004",
        "name": "Tom Apple",
        "email": "tomapple@email.com",
        "password": "mypassword4",
        "created_at": "2023-07-11 22:40:23"
    }
]
```

<br>

-------------------------
## Create user
Cadastra uma nova pessoa.
```typescript
// Request
// POST /users
// body JSON
{
    "id": "id",
    "name": "name",
    "email": "email",
    "password": "password"
}

// Response
// status 200 CREATED
{
    message: "Usuário cadastrado com sucesso." 
}
```
---------------
<br>

## Create product
Cadastra um novo produto.
```typescript
// Request
// POST /products
// body JSON
{
    "id": "id",
    "name": "name",
    "price": 0,
    "description": "description",
    "image_url": "please a jpg or png image link"
}

// Response
// status 200 CREATED
{
    message: "Produto cadastrado com sucesso"
}
```

---------------------
<br>

## Get all products
Retorna todos os produtos cadastrados.
```typescript
// Request
// GET /products

// Response
// status 200 OK
[
    {
        id: "p001",
        name: "Cheeseburger",
        price: 19.99,
        description: "A fat cheeseburger with our homemade burger meat, tomato and lettuce. Non-cheese version costs $ 14.99.",
        imageUrl: "https://i.ibb.co/WWvfS5S/burger.png"
    },
    {
        id: "p002",
        name: "Double burger",
        price: 29.99,
        description: "Our cheeseburger with double meat and much more cheese, do not waste your time! Non-cheese version costs $ 24.99.",
        imageUrl: "https://i.ibb.co/KjZm192/doubleburger.png"
    },
     {
        id: "p003",
        name: "Big Bacon",
        price: 34.99,
        description: "Look at this big monster. The big bacon contains a 110g blend, cheddar, tons of bacon slices and an artesanal bread. Non-cheese version costs $29.99.",
        imageUrl: "https://i.ibb.co/BLszRx4/bigbacon.png"
    }
]
```

---------------------------
<br>

## Get all purchases
Retorna todos os pedidos cadastrados. Para uma busca mais detalhada, use o endpoint /purchases/:id.
```typescript
// Request
// GET /purchases

// Response
// status 200 OK
[
    {
        "id": "pc001",
        "buyer": "u001",
        "total_price": 29.99,
        "created_at": "2023-07-11 22:45:06"
    },
    {
        "id": "pc002",
        "buyer": "u002",
        "total_price": 19.99,
        "created_at": "2023-07-11 22:45:06"
    },
    {
        "id": "pc003",
        "buyer": "u003",
        "total_price": 11.99,
        "created_at": "2023-07-11 22:45:06"
    },
    {
        "id": "pc004",
        "buyer": "u004",
        "total_price": 34.99,
        "created_at": "2023-07-11 22:45:06"
    },
    {
        "id": "pc005",
        "buyer": "u005",
        "total_price": 14.99,
        "created_at": "2023-07-11 22:45:06"
    },
    {
        "id": "pc006",
        "buyer": "u005",
        "total_price": 39.9,
        "created_at": "2023-07-12T23:08:15.503Z"
    }
]
```

---------------------------
<br>

## Get all products (funcionalidade extra)
Caso seja enviada uma query params (name) deve ser retornado o resultado da busca de produtos que contenham o _"name"_ informado em seu nome.
```typescript
// Request
// query params = name
// GET /products?name=fries

// Response
// status 200 OK
[
    {
        id: "p004",
        name: "French Fries (Simple)",
        price: 9.99,
        description: "A fat cheeseburger with our homemade burger meat, tomato and lettuce. Non-cheese version costs $ 14.99.",
        imageUrl: "https://i.ibb.co/FVxwG9v/fries.png"
    },
    {
        id: "p005",
        name: "French Fries (Pot)",
        price: 19.99,
        description: "Our best salted french fries now comes in a ceramic pot (just give it back). Contains 250g and comes with ketchup and mustard sauce.",
        imageUrl: "https://i.ibb.co/HqCXV1j/biggerfries.png"
    },

    {
        id: "p006",
        name: "Crazy French Fries",
        price: 29.99,
        description: "Our specialty, the crazy french fries dish is a must! It contains 250g and comes with the traditional sauces, but also a lot of cheddar and pepperoni.",
        imageUrl: "https://i.ibb.co/QFNqvW1/crazyfries.png"
    }
]
```

---------------------------
<br>

## Edit product by id
Edita um produto existente com base em seu id (este porém, não poderá ser alterado).
```typescript
// Request
// path params = :id

// PUT /products/prod003
// body JSON
{
    "name": "name",
    "price": 0,
    "description": "description",
    "image_url": "please a jpg or png image link"
}

// Response
// status 200 OK
{
    message: "Produto atualizado com sucesso"
}
```

---------------------------
<br>

## Edit user by id
Edita um usuário existente com base em seu id (este porém, não poderá ser alterado).
```typescript
// Request
// path params = :id

// PUT /products/prod003
// body JSON
{
   "name": "name",
   "email": "email",
   "password": "password"
}

// Response
// status 200 OK
{
    message: "Produto atualizado com sucesso"
}
```

---------------------------
<br>

## Create purchase
Cadastra um novo pedido.
```typescript
// Request
// POST /purchases
// body JSON
{
    "id": "id",
    "buyer": "buyer id",
    "total_price": 0,
    "products": [
        {
            "id": "product id",
            "quantity": 0
        }
    ]
}

// Response
// status 200 CREATED
{
    message: "Pedido realizado com sucesso"
}
```


---------------------------
<br>

## Delete purchase by id
Deleta um pedido existente.
```typescript
// Request
// path params = :id
// DELETE /purchases/pur002

// Response
// status 200 OK
{
    message: "Pedido cancelado com sucesso"
}
```


---------------------------
<br>

## Get purchase by id
Retorna os dados de uma compra, incluindo a lista de produtos da mesma.
```typescript
// Request
// path params = :id
// GET /purchases/pur001

// Response
// status 200 OK
{
    "purchase_id": "pc002",
    "totalPrice": 19.99,
    "createdAt": "2023-07-11 22:45:06",
    "buyerId": "u002",
    "buyerName": "Jungle Jim",
    "buyerEmail": "junglejim@email.com",
    "products": [
        {
            "id": "p001",
            "name": "Cheeseburger",
            "price": 19.99,
            "description": "A fat cheeseburger with our homemade burger meat, tomato and lettuce. Non-cheese version costs $ 14.99.",
            "image_url": "https://i.ibb.co/WWvfS5S/burger.png"
        }
    ]
}
```
<br>
As explicações detalhadas de cada endpoint se encontram presentes na [documentação](https://documenter.getpostman.com/view/26594506/2s946chaKj) desta API.

<br>

---------------------------
<br>

