import express from "express";
import expressAsyncHandler from "express-async-handler"
import Order from "../models/orderModel.js";
import { generateToken, isAuth } from "../utils.js";

const orderRouter= express.Router();

orderRouter.get('/si/mine', isAuth, expressAsyncHandler( async (req, res)=>{
    const {_id} = req.user
    const orders = await Order.find({ user : _id })
    if (orders){
    res.status(201).send(orders);
    } else {
        res.status(404).send({message : "Orders not available"})
    } 
}))

orderRouter.post('/', isAuth, expressAsyncHandler( async(req, res)=>{
    const { orderItems, shippingAddress, paymentMethod,
    itemsPrice, transportPrice, totalPrice} = req.body;
    const {_id} = req.user
    const newOrder = new Order({
        orderItems: orderItems.map((x)=> ({...x, product: x._id})),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        transportPrice,
        totalPrice,
        user: _id
        // this is how we pass it to the orderModel with the object
        // in the database, with everyone tking his own
        // we need a req.user, so we need a middleware and jwt can be used using isAuth
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order})
}))




orderRouter.get('/:id', isAuth, expressAsyncHandler( async(req, res)=>{
   const {id} = req.params;
   const order = await Order.findById(id);
   if (order){
    res.status(201).send(order)
   } else {
    res.status(404).send({ message: "Order Not Found"})
   }
}))

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler( async(req, res)=>{
    const {id} = req.params // and you can const order = await Order.findbyId(req.params.id)
    const { status, update_time, email_address } = req.body
    const order = await Order.findById(id)
    if (order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status,
            update_time,
            email_address
        }
        const updatedOrder = await order.save()
        res.send({ message: "Order Paid", order: updatedOrder});
    } else{
        res.status(404).send({message: "Order Not Found"})
    }
})
)



export default orderRouter;