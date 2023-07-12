export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string | number,
    created_at: string
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
    created_at: string
}


export type TPurchased_product = {
    purchase_id: string,
    product_id: string,
    quantity: number
}

export type TViewPurchase = {
    purchaseId: string,
    buyerId: string,
    buyerName: string,
    buyerEmail: string,
    totalPrice: number,
    products: [],
    createdAt: string
}
