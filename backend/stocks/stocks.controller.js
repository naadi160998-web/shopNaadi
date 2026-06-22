const express = require("express")
const router = express.Router();
const stockService = require("./stocks.service");
const auth = require("../_Auth/auth")

// routes
// router.post("/",auth,createStocks)
router.post("/",createStocks)
router.get("/:id",auth,findById)
// router.get("/",auth,getAllStocks)
router.get("/",getAllStocks)
// router.post("/update/:id",auth,updateStocks)
router.put("/update/:id",updateStocks)
// router.delete("/delete/:product_id/:vendor_id",auth,deleteStocks)
router.post("/delete/:stock_id",deleteStocks)

module.exports = router

// routes function
async function createStocks(req,res,next) {
    try {
        const data = await req.body
        console.log("****************data*****************:",data);
        
        const result = await stockService.createStocks(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function getAllStocks(req,res,next) {
    try {
        const result = await stockService.getAllStocks()
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}
async function updateStocks(req,res,next) {
    try {
        
        const data = await req.body
        const stock_id = await req.params.id
        const result = await stockService.updateStockss(data,stock_id)
        return res.json(result);
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}
async function deleteStocks(req,res,next) {
    try {
        console.log("req.params:",req.params);
        
        const {stock_id} = await req.params
        const objs = await req.body
        const result = await stockService.deleteStocks(stock_id);
        
        return res.json(result);
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}

async function findById(req,res,next) {
    try {
        console.log("********id****************:",req.params);
        const id = await req.params.id
        const result = await stockService.findById(id)
        return res.json(result)
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}