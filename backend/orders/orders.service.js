const db = require("../_helper/db");
const { Op } = require("sequelize")

module.exports = {
    createOrders,
    getAllOrders
}

async function createOrders(params) {
    try {
        const {order_number,customer_id,date,total_amount,status} = await params

        const orders = {
            order_number:order_number,
            customer_id:customer_id,
            date:date,
            total_amount:total_amount,
            status:status
        }

        // console.log("***************orders:",orders);
        if(!orders) return {completed: false, msg:"Values isn't found"}

        await db.Orders.create(orders)
        return {msg:"Orders created successfully"}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}

async function getAllOrders() {
    try {
        const data = await db.Orders.findAll()
        if(!data) return "orders not found!!"

        const arr = [];

        for (let i = 0; i < data.length; i++) {
            const s = await db.Orders.findAll({
                where:{customer_id:data[i].customer_id},
                include:[
                    {
                       model : db.Customers,
                       as: "Orders_customer_id"
                    }
                ]
            })

            arr.push(s)
        }

        const orders = arr.flat()

        return orders
    } catch (error) {

        console.log("error:< ",error);
        
        return error
    }
}