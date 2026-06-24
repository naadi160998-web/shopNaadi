const express = require("express")
const router = express.Router()
const purchaseOrdersService = require("./purchase_orders.service")
const auth = require("../_Auth/auth")

module.exports = router;

router.post("/",createPurchaseOrders)

async function createPurchaseOrders(req,res,next) {
    try {
        const data = await req.body;
        const result = await purchaseOrdersService.createPurchaseOrders(data)
        return res.json(result);
    } catch (error) {
        return res.json(error)
    }
}