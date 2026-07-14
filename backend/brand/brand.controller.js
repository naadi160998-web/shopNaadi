const express = require("express");
const router = express();
const brandServices = require("./brand.service");
// const auth = require("../_Auth/auth")

module.exports = router

router.post("/",createBrand)
router.get("/",getAllBrands)
router.put("/update/:id",updateBrands)
router.post("/delete/:brand_id",deleteBrands)

async function createBrand(req,res,next) {
    try {
        const data = await req.body;
        const category = await brandServices.createBrands(data);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllBrands(req,res,next) {
    try {
        const data = await req.body;
        const category = await brandServices.getAllBrands(data);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateBrands(req,res,next) {
    try {
        
        const data = await req.body
        const brand_id = await req.params.id
        const result = await brandServices.updateBrands(data,brand_id)
        return res.json(result);
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}
async function deleteBrands(req,res,next) {
    try {
        console.log("req.params:",req.params);
        
        const {brand_id} = await req.params
        const objs = await req.body
        const result = await brandServices.deleteBrands(brand_id);
        
        return res.json(result);
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}