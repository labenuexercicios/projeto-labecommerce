enum CATEGORY {
  ACCESSORIES = 'Acessórios',
  CLOTHES_AND_SHOES = 'Roupas e calçados',
  ELECTRONICS = 'Eletrônicos',
}

type TUser = {
  id: number
  email: string
  password: string
}

type TProduct = {
  id: string
  name: string
  price: number
  category: CATEGORY
}

type TPurchase = {
  userId: number
  productId: string
  quantity: number
  totalPrice: number
}

export {TUser, TProduct, TPurchase, CATEGORY}
