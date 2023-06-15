import { TUser, TProduct, TPurchase, TPurchased_product } from "./types";

export const users: TUser[] = [

    {
        id: "u001",
        name: "Mary Christmas",
        email: "marychristmas@email.com",
        password: "mypassword1",
        created_at: new Date
    },    
    {
        id: "u003",
        name: "Jungle Jim",
        email: "junglejim@email.com",
        password: "mypassword2",
        created_at: new Date
    },
    {
        id: "u003",
        name: "Suzi Snoozie",
        email: "suziesnoozie@email.com",
        password: "mypassword3",
        created_at: new Date
    },
    { 
        id: "u004",
        name: "Tom Apple",
        email: "tomapple@email.com",
        password: "mypassword4",
        created_at: new Date
    }

]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Cheeseburger",
        price: 19.99,
        description: "A fat cheeseburger with our homemade burger meat, tomato and lettuce. Non-cheese version costs $ 14.99.",
        image_url: "https://i.ibb.co/WWvfS5S/burger.png"
    },

    {
        id: "p002",
        name: "Double Burger",
        price: 29.99,
        description: "string",
        image_url: "Double cheese, double meat, double taste! The double burger is such a good option for the hungry ones. Non-cheese version costs $ 24.99."
    }
    ,
    {
        id: "p003",
        name: "Big Bacon",
        price: 34.99,
        description: "Look at this big monster. The big bacon contains a 110g blend, cheddar, tons of bacon slices and an artesanal bread. Non-cheese version costs $29.99.",
        image_url: "https://i.ibb.co/BLszRx4/bigbacon.png"
    },
    {
        id: "p004",
        name: "French Fries (Simple)",
        price: 9.99,
        description: "Our best salted french fries in our simple red package. Contains 150g and comes with ketchup and mustard sauce.",
        image_url: "https://i.ibb.co/FVxwG9v/fries.png"
    }, {
        id: "p005",
        name: "French Fries (Pot)",
        price: 19.99,
        description: "Our best salted french fries now comes in a ceramic pot (just give it back). Contains 250g and comes with ketchup and mustard sauce.",
        image_url: "https://i.ibb.co/HqCXV1j/biggerfries.png"
    },

    {
        id: "p006",
        name: "Crazy French Fries (Pepperoni + Cheddar)",
        price: 29.99,
        description: "A house's specialty, our 'crazy french fries' dish is a must! It contains 250g and comes with the traditional sauces, but also a lot of cheddar and pepperoni.",
        image_url: "https://i.ibb.co/QFNqvW1/crazyfries.png"
    }
    ,
    {
        id: "p007",
        name: "Soda",
        price: 8.99,
        description: "A 600ml soda bottle. We have the cola, orange, lemon and brazilian fruit 'Guaraná' versions.",
        image_url: "https://i.ibb.co/BNjvKnX/soda.png"
    },
    {
        id: "p008",
        name: "Water Bottle",
        price: 2.99,
        description: "A 500ml fresh water bottle. The sparkling version costs the same price.",
        image_url: "https://i.ibb.co/sj1PHBM/water.png"
    }, 
    {
        id: "p009",
        name: "Juice",
        price: 11.99,
        description: "A 500ml cup of fruit juice. We have a lot of options and charge a plus $1 if you want it milk-based. Plastic cups for delivery orders.",
        image_url: "https://i.ibb.co/0nb4972/juice.png"
    },

    {
        id: "p010",
        name: "Ice Cream",
        price: 2.99,
        description: "The popular one ice cream ball on a cone. Two balls for $ 3.49, three for $ 3.99. Maximum of 3 balls. Avaliable flavors are vanilla, strawberry or chocolate.",
        image_url: "https://i.ibb.co/j81YfVJ/icecream.png"
    }
    ,
    {
        id: "p011",
        name: "Milkshake",
        price: 14.99,
        description: "A traditional 500ml milkshake. Avaliable flavors are vanilla, strawberry or chocolate.",
        image_url: "https://i.ibb.co/k4J3PTx/milkshake.png"
    },
    {
        id: "p012",
        name: "Brazilian Açaí",
        price: 11.99,
        description: "Açaí is a popular Amazonian fruit highly used in Brazil as a dish or dessert. This version is an 500ml ice-cream like dessert with a lot of sides!",
        image_url: "https://i.ibb.co/nDK103d/acai.png"
    }

]

export const purchases: TPurchase[] = []

export const purchased_Products: TPurchased_product[] = []