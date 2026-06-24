const express = require("express")
const router = express.Router()
const paymentService = require("./payment.service")
const auth = require("../_Auth/auth")

module.exports = router

router.post("/",createPayment)

async function createPayment(req,res,next) {
    try {
        const data = await req.body;
        const result = await paymentService.createPayment(data)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}