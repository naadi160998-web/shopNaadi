const db = require("../_helper/db");
const { Op } = require("sequelize")

module.exports = {
    createOrders
}

async function createOrders(params) {
    try {
        const {order_number,customer_id,total_amount,status} = await params

        const orders = {
            order_number:order_number,
            customer_id:customer_id,
            total_amount:total_amount,
            status:status
        }

        console.log("***************orders:",orders);
        if(!orders) return {completed: false, msg:"Values isn't found"}

        await db.Orders.create(orders)
        return {msg:"Orders created successfully"}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}