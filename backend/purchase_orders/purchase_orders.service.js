const db = require("../_helper/db")
const { Op } = require("sequelize")

module.exports = {
    createPurchaseOrders
}

async function createPurchaseOrders(params) {
    try {
        const {
            suppliers_id,
            warehouse_id,
            order_date,
            status,
        } = params

        const purchaseOrders = {
            suppliers_id:suppliers_id,
            warehouse_id:warehouse_id,
            order_date:order_date,
            status:status
        }

        console.log("*************purchaseOrder:",purchaseOrders);
        if(!purchaseOrders) return "Value not come!!!"
        await db.Purchase_Orders.create(purchaseOrders)
        return {msg:"created successfully"}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}