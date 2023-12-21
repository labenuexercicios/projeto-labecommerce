"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Pong!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users");
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let quer = knex_1.db.select('*').from('products');
        const nameProduct = req.params.name;
        if (nameProduct && nameProduct.length >= 1) {
            quer = quer.where('name', 'like', `%${nameProduct}%`);
        }
        const products = yield quer;
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield knex_1.db.select('*').from('products').where('id', productId).first();
        if (!product) {
            throw new Error('Produto com o ID fornecido não existe.');
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
app.get("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchases = yield knex_1.db.select('*').from('purchases');
        res.status(200).json(purchases);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar compras.");
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseId = req.params.id;
        const purchase = yield knex_1.db.select('*').from('purchases').where('id', purchaseId).first();
        if (!purchase) {
            throw new Error('Compra com o ID fornecido não existe.');
        }
        res.status(200).json(purchase);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (typeof id !== "string") {
            throw new Error("id deve ser uma string");
        }
        const existingUser = yield knex_1.db.select('*').from('users').where('id', id).orWhere('email', email).first();
        if (existingUser) {
            throw new Error('Usuário com o mesmo ID ou email já existe.');
        }
        if (typeof name !== "string") {
            throw new Error("name deve ser uma string");
        }
        if (typeof email !== "string") {
            throw new Error("email deve ser uma string");
        }
        if (typeof password !== "string") {
            throw new Error("password deve ser uma string");
        }
        const newUser = { id, name, email, password };
        yield (0, knex_1.db)('users').insert(newUser);
        res.status(200).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const image_url = req.body.image_url;
        if (typeof id !== "string") {
            throw new Error("id deve ser uma string");
        }
        const existingProduct = yield knex_1.db.select('*').from('products').where('id', id).first();
        if (existingProduct) {
            throw new Error('Produto com o mesmo ID já existe.');
        }
        if (typeof name !== "string") {
            throw new Error("name deve ser uma string");
        }
        if (typeof price !== "number") {
            throw new Error("price deve ser um number");
        }
        if (typeof description !== "string") {
            throw new Error("description deve ser uma string");
        }
        if (typeof image_url !== "string") {
            throw new Error("image deve ser uma string");
        }
        const newProduct = { id, name, price, description, image_url };
        yield (0, knex_1.db)('products').insert(newProduct);
        res.status(200).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const buyer = req.body.buyer;
        const total_price = req.body.total_price;
        const existingBuyer = yield knex_1.db.select('*').from('users').where('id', buyer).first();
        if (!existingBuyer) {
            throw new Error('Comprador com o ID fornecido não existe.');
        }
        const newPurchase = { id, buyer, total_price };
        yield (0, knex_1.db)('purchases').insert(newPurchase);
        res.status(200).send("Compra criada com sucesso");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.params.id;
        const user = yield knex_1.db.select('*').from('users').where('id', idUser).first();
        if (!user) {
            throw new Error('Usuário com o ID fornecido não existe.');
        }
        yield (0, knex_1.db)('users').where('id', idUser).del();
        res.status(200).send("User apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idProduct = req.params.id;
        const product = yield knex_1.db.select('*').from('products').where('id', idProduct).first();
        if (!product) {
            throw new Error('Usuário com o ID fornecido não existe.');
        }
        yield (0, knex_1.db)('products').where('id', idProduct).del();
        res.status(200).send("Produto apagado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.delete("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseId = req.params.id;
        const purchase = yield knex_1.db.select('*').from('purchases').where('id', purchaseId).first();
        if (!purchase) {
            throw new Error('Compra com o ID fornecido não existe.');
        }
        yield (0, knex_1.db)('purchases').where('id', purchaseId).del();
        res.status(200).send("Compra apagada com sucesso");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idEdit = req.params.id;
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImageUrl = req.body.image_url;
        const existProduct = yield knex_1.db.select('*').from('products').where('id', idEdit).first();
        if (!existProduct) {
            throw new Error('Produto com o ID fornecido não existe.');
        }
        yield (0, knex_1.db)('products').where('id', idEdit).update({
            id: newId,
            name: newName,
            price: newPrice,
            description: newDescription,
            image_url: newImageUrl
        });
        res.status(200).send("Produto atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
