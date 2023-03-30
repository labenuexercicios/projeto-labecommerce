enum CATEGORY {
  ACCESSORIES = 'Acessórios',
  CLOTHES_AND_SHOES = 'Roupas e calçados',
  ELECTRONICS = 'Eletrônicos',
}

type TUser = {
  id: string
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
  userId: string
  productId: string
  quantity: number
  totalPrice: number
}

export {TUser, TProduct, TPurchase, CATEGORY}
