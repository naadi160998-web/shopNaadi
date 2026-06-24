const express = require("express")
const router = express.Router();
const orderItemsService = require("./order_items.service");
const auth = require("../_Auth/auth")

// routes
// router.post("/",auth,createStockLogs)
router.post("/",createOrderItems)

module.exports = router

// routes function
async function createOrderItems(req,res,next) {
    try {
        const data = await req.body
        console.log("****************data*****************:",data);
        
        const result = await orderItemsService.createOrderItems(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}