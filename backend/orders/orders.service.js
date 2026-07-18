const db = require("../_helper/db");
const { Op } = require("sequelize")

module.exports = {
    createOrders,
    getAllOrders
}

async function createOrders(params) {
    try {
        // console.log("params:",params);
        
        const {order_number,customer_id,date,total_amount,status} = await params

        const orders = {
            order_number:order_number,
            customer_id:customer_id,
            date:date,
            total_amount:total_amount,
            status:status
        }

        // // console.log("***************orders:",orders);
        if(!orders) return {completed: false, msg:"Values isn't found"}

        await db.Orders.create(orders)
        const order = await db.Orders.findOne({
            where:{
                order_number:order_number
            }
        })
        return {msg:"Orders created successfully",status:201,order:order}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}

async function getAllOrders() {
    try {
        const data = await db.Orders.findAll()
        if(!data) return "orders not found!!"
        return data
    } catch (error) {

        console.log("error:< ",error);
        
        return error
    }
}