"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
const users = [
    {
        id: 'u001',
        email: 'clara@gmail.com',
        password: 'clara123',
    },
    {
        id: 'u002',
        email: 'carlos@gmail.com',
        password: 'carlos123',
    },
];
exports.users = users;
const products = [
    {
        id: 'p001',
        name: 't-shirt',
        price: 49.9,
        category: types_1.CATEGORY.CLOTHES_AND_SHOES,
    },
    {
        id: 'p002',
        name: 'sneakers',
        price: 199.9,
        category: types_1.CATEGORY.CLOTHES_AND_SHOES,
    },
    {
        id: 'p003',
        name: 'backpack',
        price: 79.9,
        category: types_1.CATEGORY.ACCESSORIES,
    },
    {
        id: 'p004',
        name: 'smartphone',
        price: 1499.9,
        category: types_1.CATEGORY.ELECTRONICS,
    },
    {
        id: 'p005',
        name: 'headphones',
        price: 299.9,
        category: types_1.CATEGORY.ELECTRONICS,
    },
    {
        id: 'p006',
        name: 'watch',
        price: 499.9,
        category: types_1.CATEGORY.ACCESSORIES,
    },
    {
        id: 'p007',
        name: 'sunglasses',
        price: 99.9,
        category: types_1.CATEGORY.ACCESSORIES,
    },
    {
        id: 'p008',
        name: 'smartwatch',
        price: 899.9,
        category: types_1.CATEGORY.ELECTRONICS,
    },
];
exports.products = products;
function calculateTotalPrice(productPrice, quantity) {
    return productPrice * quantity;
}
const purchases = [
    {
        userId: users[0].id,
        productId: products[0].id,
        quantity: 1,
        totalPrice: calculateTotalPrice(products[0].price, 1),
    },
    {
        userId: users[1].id,
        productId: products[1].id,
        quantity: 2,
        totalPrice: calculateTotalPrice(products[1].price, 2),
    },
];
exports.purchases = purchases;
//# sourceMappingURL=database.js.map