const express = require("express")
const router = express.Router()
const returnProductServices = require("./return_product.service")
const auth = require("../_Auth/auth")

module.exports = router;

router.post("/",createReturnProduct)

async function createReturnProduct(req,res,next) {
    try {
        const data = await req.body;
        const result = await returnProductServices.createReturnProduct(data)
        return res.json(result);
    } catch (error) {
        return res.json(error)
    }
}