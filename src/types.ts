enum CATEGORY {
  ACCESSORIES = "Acessórios",
  CLOTHES_AND_SHOES = "Roupas e calçados",
  ELECTRONICS = "Eletrônicos"
}

type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type TProduct = {
  id: string
  name: string
  price: number
  category: string
  description: string
  imageUrl: string
}

type TPurchase = {
  userId: string
  id: string
  paid: number
  delivered_at: string
  total_price: number
}




export { TUser, TProduct, TPurchase, CATEGORY}