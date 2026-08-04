const express = require("express")
const routes = express.Router()
const shipmentService = require("./shipment.service")
const auth=require("../_Auth/auth")

module.exports = routes

routes.post("/",createShipment)
routes.get("/",getAllShipment)

async function createShipment(req,res,next) {
    try {
        const collections = await req.body;
        const result = await shipmentService.createShipment(collections)
        return res.json(result)
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

async function getAllShipment(req, res, next) {
    try {
        const data = await shipmentService.getAllShipment()
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}