const db = require("../_helper/db");
const { Op } = require("sequelize")

module.exports = {
    createOrderItems
}

async function createOrderItems(params) {
    try {
        const {order_id,product_id,warehouse_id,qty,total_amount,subTotal} = await params

        const ordersItems = {
            order_id:order_id,
            product_id:product_id,
            warehouse_id:warehouse_id,
            quantity:qty,
            price:total_amount,
            subTotal:total_amount
        }

        // console.log("***************ordersItems:",ordersItems);
        if(!ordersItems) return {completed: false, msg:"Values isn't found"}

        await db.OrderItems.create(ordersItems)
        return {msg:"ordersItems created successfully",status:201}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}