const db = require("../_helper/db")
const { Op } = require("sequelize")

module.exports = {
    createWishlists
}

async function createWishlists(params) {
    try {
        const {
            customer_id,
            product_id,
        } = await params

        const wishlist = {
            customer_id:1,
            product_id:40,
        }

        console.log("***********Wishlists:",wishlist);
        if(!wishlist) return "Value not come!!!"

        await db.Wishlist.create(wishlist)
        return "create successfully"
        
    } catch (error) {
        console.log(":< = ",error);
        
        return error
    }
}