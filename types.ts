export enum ACCOUNT_TYPE {
    BRONZE = "Bronze",
    SILVER = "Prata",
    GOLD = "Ouro",
    PLATINUM = "Platina",
    BLACK = "Black"
}

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string | number,
    created_at: Date
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}


export type TPurchase = {
    id: string,
    buyer: string,
    total_price: number,
    created_at: Date
}


export type TPurchased_product = {
    purchase_id: string,
    product_id: string,
    quantity: number
}

