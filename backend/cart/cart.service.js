const db = require("../_helper/db")
const { Op } = require("sequelize");

module.exports = {
    createCart
}

async function createCart(params) {
    try {
        const {
            customer_id,
            product_id,
            quantity,
        } = await params

        const cart = {
            customer_id:customer_id,
            product_id:product_id,
            quantity:quantity
        }

        console.log("***************Cart:",cart);
        if(!cart) return "Value not come"

        await db.Cart.create(cart)
        return "Create successfull"
        
    } catch (error) {
        console.log(":< = ",error);
        return error
    }
}