const express = require("express")
const router = express.Router();
const simpleProductService = require("./SimpleProducts.service");

// routes
router.post("/",createProducts)

module.exports = router

// routes function
async function createProducts(req,res,next) {
    try {
        const data = await req.body
        console.log("data:",data);
        
        const result = await simpleProductService.createProducts(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}