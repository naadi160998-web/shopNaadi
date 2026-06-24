const express = require("express");
const router = express.Router();
const supplierService = require("./suppliers.service");
const auth = require("../_Auth/auth");

module.exports = router

router.post("/",createSuppliers);

async function createSuppliers(req,res,next) {
    try {
        const data = await req.body;
        const result = await supplierService.createSuppliers(data)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}