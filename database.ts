import { TUser, TProduct, TPurchase, TPurchased_product } from "./types";

export const users: TUser[] = [

    {
        id: "u001",
        name: "Usuário 1",
        email: "email1@email.com",
        password: "minhasenha1",
        created_at: new Date
    },    
    {
        id: "u003",
        name: "Usuário 2",
        email: "email2@email.com",
        password: "minhasenha2",
        created_at: new Date
    },
    {
        id: "u003",
        name: "Usuário 3",
        email: "email3@email.com",
        password: "minhasenha3",
        created_at: new Date
    }

]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Produto 1",
        price: 7.99,
        description: "string",
        image_url: "string"
    },

    {
        id: "p002",
        name: "Produto 2",
        price: 39.99,
        description: "string",
        image_url: "string"
    }
    ,
    {
        id: "p003",
        name: "Produto 3",
        price: 79.99,
        description: "string",
        image_url: "string"
    }
]