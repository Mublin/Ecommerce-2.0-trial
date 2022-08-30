import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();


productRouter.get("/", async (req, res)=>{
    const products = await Product.find()
    if (products){
    res.status(201).send(products)
    } else{
        res.status(500).send({ message: "Products not Available"})
    }
})

productRouter.get("/slug/:slug", async (req, res)=>{
    const { slug } = req.params;
    const product = await Product.findOne({slug: slug})
    if(product){
        return res.status(201).send(product)
    } else{
        return res.status(404).send({message: "Product does not exist"})
    }
})
productRouter.get("/:_id", async (req, res)=>{
    const { _id } = req.params;
    const product = await Product.findById(_id)
    if(product){
        return res.status(201).send(product)
    } else{
        return res.status(404).send({message: "Product does not exist"})
    }
})

export default productRouter;