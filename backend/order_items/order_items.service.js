const db = require("../_helper/db");
const { Op } = require("sequelize")

module.exports = {
    createOrderItems
}

async function createOrderItems(params) {
    try {
        const {order_id,product_id,quantity,price,subTotal} = await params

        const ordersItems = {
            order_id:order_id,
            product_id:product_id,
            quantity:quantity,
            price:price,
            subTotal:subTotal
        }

        console.log("***************ordersItems:",ordersItems);
        if(!ordersItems) return {completed: false, msg:"Values isn't found"}

        await db.OrderItems.create(ordersItems)
        return {msg:"ordersItems created successfully"}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}