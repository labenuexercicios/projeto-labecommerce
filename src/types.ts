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
  image_url: string
}




export { TUser, TProduct, CATEGORY}