const db = require("../_helper/db")
const { Op } = require("sequelize")

module.exports = {
    createReturnProduct
}

async function createReturnProduct(params) {
    try {
        const {
            order_items_id,
            status
        } = params

        const returnProduct = {
            order_items_id:order_items_id,
            status:status
        }

        console.log("*************returnProduct:",returnProduct);
        if(!returnProduct) return "Value not come!!!"
        await db.Return_Product.create(returnProduct)
        return {msg:"created successfully"}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}