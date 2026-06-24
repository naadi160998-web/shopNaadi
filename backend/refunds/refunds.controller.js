const express = require("express")
const router = express.Router()
const refundsServices = require("./refunds.service")
const auth = require("../_Auth/auth")

module.exports = router;

router.post("/",createRefunds)

async function createRefunds(req,res,next) {
    try {
        const data = await req.body;
        const result = await refundsServices.createRefunds(data)
        return res.json(result);
    } catch (error) {
        return res.json(error)
    }
}