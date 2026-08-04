const express = require("express")
const routes = express.Router()
const billingAddressService = require("./billing_address.service")
const auth=require("../_Auth/auth")

module.exports = routes

routes.post("/",createBilling)
routes.get("/",getAllBilling)

async function createBilling(req,res,next) {
    try {
        const collections = await req.body;
        const result = await billingAddressService.createBilling(collections)
        return res.json(result)
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

async function getAllBilling(req, res, next) {
    try {
        const data = await billingAddressService.getAllBilling()
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}