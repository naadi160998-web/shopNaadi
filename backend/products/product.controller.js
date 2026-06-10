const express = require("express")
const router = express.Router();
const productService = require("./product.service");
const auth = require("../_Auth/auth")
const fs = require("fs")
const path = require("path")

// routes
// router.post("/",auth,createProducts)
router.post("/",createProducts)
// router.post("/:id",auth,getProductUserId)
router.get("/:id",getProductUserId)
router.get("/:id",auth,findById)
router.get("/",auth,getAllProducts)
// router.post("/update/:id",auth,updateProduct)
router.put("/update/:id",updateProduct)
// router.delete("/delete/:product_id/:vendor_id",auth,deleteProducts)
router.post("/delete/:product_id/:vendor_id",deleteProducts)

module.exports = router

// routes function
async function createProducts(req,res,next) {
    try {
        const data = await req.body
        console.log("****************data*****************:",data);
        
        const result = await productService.createProducts(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function getProductUserId(req,res,next) {
    try {
        // console.log("***************id:",req.params.id);
        const id = await req.params.id
        // console.log("***************id:",id);
        
        const result = await productService.getProductUserId(Number(id))
        // console.log("9999999999999999999999result:",JSON.stringify(result));
        
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function getAllProducts(req,res,next) {
    try {
        const result = await productService.getAllProducts()
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}
async function updateProduct(req,res,next) {
    try {
        // console.log("req.body",req.body)
        // console.log("id:",req.params.id);
        
        const data = await req.body
        const product_id = await req.params.id
        const result = await productService.updateProducts(data,product_id)
        return res.json(result);
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}
async function deleteProducts(req,res,next) {
    try {
        console.log("req.params:",req.params);
        
        const {product_id,vendor_id} = await req.params
        const objs = await req.body
        const result = await productService.deleteProducts(product_id,vendor_id,objs);
        // console.log("imgIds:",imgIds);
        return res.json(result);
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}

async function findById(req,res,next) {
    try {
        console.log("********id****************:",req.params);
        const id = await req.params.id
        const result = await productService.findById(id)
        return res.json(result)
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}