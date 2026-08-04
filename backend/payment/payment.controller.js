const express = require("express")
const routes = express.Router()
const paymentService = require("./payment.service")
const auth=require("../_Auth/auth")

module.exports = routes

routes.post("/",createPayment)
routes.get("/",getAllPayment)

async function createPayment(req,res,next) {
    try {
        const collections = await req.body;
        const result = await paymentService.createPayment(collections)
        return res.json(result)
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

async function getAllPayment(req, res, next) {
    try {
        const data = await paymentService.getAllPayment()
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}