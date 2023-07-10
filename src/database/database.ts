//Não será mais usado!

import { TProducts, TUsers } from "../types";

export const users: Array<TUsers> = [
  {
    id: "jc1",
    name: "Augustus",
    email: "augustus@caesar.spqr",
    password: "cae1",
    createAt: new Date().toISOString()
  },
  {
    id: "jc2",
    name: "Tiberius",
    email: "tiberius@caesar.spqr",
    password: "cae2",
    createAt: new Date().toISOString()
  },
  {
    id: "jc3",
    name: "Caligula",
    email: "gaius@caesar.spqr",
    password: "cae3",
    createAt: new Date().toISOString()
  },
  {
    id: "jc4",
    name: "Claudius",
    email: "claudius@caesar.spqr",
    password: "cae4",
    createAt: new Date().toISOString()
  },
  {
    id: "jc5",
    name: "Nero",
    email: "nero@caesar.spqr",
    password: "cae5",
    createAt: new Date().toISOString()
  }
];

export const products: Array<TProducts> = [
  {
    id: "p001",
    name: "bread",
    price: 1,
    description: "bread",
    imageUrl: "xxx",
  },

  {
    id: "p002",
    name: "wine",
    price: 10,
    description: "wine",
    imageUrl: "xxx",
  },

  {
    id: "p003",
    name: "olive oil",
    price: 12,
    description: "olive oil",
    imageUrl: "xxx",
  },

  {
    id: "p004",
    name: "garum",
    price: 20,
    description: "smells nice",
    imageUrl: "xxx",
  }
];
