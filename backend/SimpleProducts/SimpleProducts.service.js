const db = require("../_helper/db")

module.exports = {
    createProducts,
}
// create
async function createProducts(params) {
    try {
        const product = await params;

        await db.SimpleProducts.create(product);

        return {msg:"Product created successfully"}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}
