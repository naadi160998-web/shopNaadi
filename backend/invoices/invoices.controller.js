const express = require("express")
const routes = express.Router()
const invoiceService = require("./invoices.service")
const auth=require("../_Auth/auth")

module.exports = routes

routes.post("/",createInvoice)
routes.get("/",getAllInvoices)

async function createInvoice(req,res,next) {
    try {
        const collections = await req.body;
        const result = await invoiceService.createInvoice(collections)
        return res.json(result)
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

async function getAllInvoices(req, res, next) {
    try {
        const data = await invoiceService.getAllInvoices()
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}