import bcrypt from "bcryptjs"
export const data = {
    users: [{
        name: "Mubarak",
        email: "mubarak@mubleen.com",
        password: bcrypt.hashSync('1810'),
        isAdmin: true
    },
    {
        name: "Abdul",
        email: "abdul@mubleen.com",
        password: bcrypt.hashSync('1111'),
        isAdmin: false
    }
],
    products:[
        {
            name: 'Nike plain Shirt',
            slug: "nike-shirt",
            countInstock: 10,
            category: 'Shirts',
            description: "gwanjo, be carefree",
            brand: 'Nike',
            price: 70.0,
            rating: 4.5,
            numReviews: 10,
            image: "https://media.kohlsimg.com/is/image/kohls/5561921?wid=240&hei=240&op_sharpen=1"
        },
        {
        name: 'Adidas plain Shirt',
        slug: "adidas-shirt",
            countInstock: 10,
            category: 'Shirts',
            description: "best shirt right now",
        category: 'Shirts',
        brand: 'Adidas',
        price: 75.0,
        rating: 4.0,
        numReviews: 15,
        image: "https://media.kohlsimg.com/is/image/kohls/5561921?wid=240&hei=240&op_sharpen=1" 
        },
        {
            name: 'Nike shorts',
            slug: "nike-shorts",
            countInstock: 10,
            category: 'Pants',
            description: "one in town",
            category: 'pants',
            brand: 'Nike',
            price: 90.0,
            rating: 4.5,
            numReviews: 10,
            image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/lzkta3iw5z8q2mtkankw/tempo-luxe-running-shorts-nj76Jv.jpg" 
        },
        {
            name: 'Adidas shorts',
            slug: "adidas-shorts",
            countInstock: 0,
            category: 'Shorts',
            description: "very high quality",
            category: 'pants',
            brand: 'Adidas',
            price: 56.0,
            rating: 3.5,
            numReviews: 10,
            image: "https://th.bing.com/th/id/R.39257a464a9a3bba49e4ed7ae3dca8cd?rik=4YmmDRU9TTVneA&pid=ImgRaw&r=0" 
        }
]
}