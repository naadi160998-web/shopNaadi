const express = require("express")
const routes = express.Router()
const deliveryService = require("./deliveries.service")
const auth=require("../_Auth/auth")

module.exports = routes

routes.post("/",createdelivery)
routes.get("/",getAllDelivery)

async function createdelivery(req,res,next) {
    try {
        const collections = await req.body;
        const result = await deliveryService.createdelivery(collections)
        return res.json(result)
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

async function getAllDelivery(req, res, next) {
    try {
        const data = await deliveryService.getAllDelivery()
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}