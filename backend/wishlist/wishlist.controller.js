const express = require("express")
const router = express.Router()
const wishlistService = require("./wishlist.service")
const auth = require("../_Auth/auth")

module.exports = router;

router.post("/",createWishlists);

async function createWishlists(req,res,next) {
    try {
        const data = await req.body;
        const result = await wishlistService.createWishlists(data)
        return res.json(result)
    } catch (error) {
        res.json(error)
    }
}