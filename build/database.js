"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.allProducts = exports.createProduct = exports.getAllUsers = exports.allUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "User01",
        email: "user01@gmail.com",
        password: "u01fu",
        createdAt: (new Date().toISOString())
    },
    {
        id: "u002",
        name: "User02",
        email: "user02@gmail.com",
        password: "u02fu",
        createdAt: (new Date().toISOString())
    }
];
exports.products = [
    {
        id: "p001",
        name: "mouse",
        price: 250,
        description: "Melhor mouse",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "p002",
        name: "monitor",
        price: 900,
        description: "Melhor monitor",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
];
function createUser(id, name, email, password) {
    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: (new Date().toISOString())
    };
    exports.users.push(newUser);
    console.log(`Cadastro realizado com sucesso`);
}
exports.createUser = createUser;
function allUsers() {
    return exports.users;
}
exports.allUsers = allUsers;
exports.getAllUsers = allUsers();
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    };
    exports.products.push(newProduct);
    console.log(`Produto criado com sucesso`);
}
exports.createProduct = createProduct;
function allProducts() {
    return exports.products;
}
exports.allProducts = allProducts;
exports.getAllProducts = allProducts();
function searchProductsByName(name) {
    const nameSearch = name.toLowerCase();
    return exports.products.find((product) => product.name.toLowerCase() === nameSearch);
}
exports.searchProductsByName = searchProductsByName;
