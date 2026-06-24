const express = require("express")
const router = express.Router();
const ordersService = require("./orders.service");
const auth = require("../_Auth/auth")

// routes
// router.post("/",auth,createStockLogs)
router.post("/",createOrders)

module.exports = router

// routes function
async function createOrders(req,res,next) {
    try {
        const data = await req.body
        console.log("****************data*****************:",data);
        
        const result = await ordersService.createOrders(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}