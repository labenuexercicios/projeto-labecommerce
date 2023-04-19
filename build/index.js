"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.post("/users", (req, res) => {
    const { id, email, password } = req.body;
    const existingUserById = database_1.users.find(user => user.id === id);
    const existingUserByEmail = database_1.users.find(user => user.email === email);
    if (existingUserById) {
        res.status(400).send("Não é possível criar mais de uma conta com a mesma id.");
        return;
    }
    if (existingUserByEmail) {
        res.status(400).send("Não é possível criar mais de uma conta com o mesmo e-mail.");
        return;
    }
    const newUser = { id, email, password };
    database_1.users.push(newUser);
    res.status(201).send({ message: "Cadastro realizado com sucesso", newUser });
    console.log(newUser);
});
//# sourceMappingURL=index.js.map