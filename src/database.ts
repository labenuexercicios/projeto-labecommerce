import { CATEGORY, TProduct, TPurchase, TUser } from './types'

const users: TUser[] = [
  {
    id: 1,
    email: 'clara@gmail.com',
    password: 'clara123',
  },
  {
    id: 2,
    email: 'carlos@gmail.com',
    password: 'carlos123',
  },
]


const products: TProduct[] = [
    {
      id: 'p001',
      name: 't-shirt',
      price: 49.9,
      category: CATEGORY.CLOTHES_AND_SHOES,
    },
    {
      id: '2',
      name: 'sneakers',
      price: 199.9,
      category: CATEGORY.CLOTHES_AND_SHOES,
    },
    {
      id: 'p003',
      name: 'backpack',
      price: 79.9,
      category: CATEGORY.ACCESSORIES,
    },
    {
      id: 'p004',
      name: 'smartphone',
      price: 1499.9,
      category: CATEGORY.ELECTRONICS,
    },
    {
      id: 'p005',
      name: 'headphones',
      price: 299.9,
      category: CATEGORY.ELECTRONICS,
    },
    {
      id: 'p006',
      name: 'watch',
      price: 499.9,
      category: CATEGORY.ACCESSORIES,
    },
    {
      id: 'p007',
      name: 'sunglasses',
      price: 99.9,
      category: CATEGORY.ACCESSORIES,
    },
    {
      id: 'p008',
      name: 'smartwatch',
      price: 899.9,
      category: CATEGORY.ELECTRONICS,
    },
  ]

function calculateTotalPrice(productPrice: number, quantity: number): number {
    return productPrice * quantity;
  }

const purchases: TPurchase[] = [
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

export{users, products, purchases}
