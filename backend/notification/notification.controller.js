const express = require("express");
const router = express.Router();
const notificationService = require("./notification.services");
const auth = require("../_Auth/auth");

module.exports = router

router.post("/",auth,create)

async function create(req,res,next) {
    try {
        const data = await req.body
        const result = await notificationService.createNotification(data)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}