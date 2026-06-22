const express = require("express")
const router = express.Router();
const stockLogsService = require("./stock_logs.service");
const auth = require("../_Auth/auth")

// routes
// router.post("/",auth,createStockLogs)
router.post("/",createStocks_Logs)

module.exports = router

// routes function
async function createStocks_Logs(req,res,next) {
    try {
        const data = await req.body
        console.log("****************data*****************:",data);
        
        const result = await stockLogsService.createStocks_Logs(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}