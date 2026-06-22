const express = require("express")
const router = express.Router();
const warehouseService = require("./warehouse.service");
const auth = require("../_Auth/auth")

// routes
// router.post("/",auth,createWarehouses)
router.post("/",createWarehouses)
router.get("/:id",auth,findById)
// router.get("/",auth,getAllWarehouses)
router.get("/",getAllWarehouses)
// router.post("/update/:id",auth,updateWarehouses)
router.put("/update/:id",updateWarehouses)
// router.delete("/delete/:product_id/:vendor_id",auth,deleteWarehouses)
router.post("/delete/:warehouse_id",deleteWarehouses)

module.exports = router

// routes function
async function createWarehouses(req,res,next) {
    try {
        const data = await req.body
        console.log("****************data*****************:",data);
        
        const result = await warehouseService.createWarehouses(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function getAllWarehouses(req,res,next) {
    try {
        const result = await warehouseService.getAllWarehouses()
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}
async function updateWarehouses(req,res,next) {
    try {
        
        const data = await req.body
        const warehouse_id = await req.params.id
        const result = await warehouseService.updateWarehousess(data,warehouse_id)
        return res.json(result);
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}
async function deleteWarehouses(req,res,next) {
    try {
        console.log("req.params:",req.params);
        
        const {warehouse_id} = await req.params
        const objs = await req.body
        const result = await warehouseService.deleteWarehouses(warehouse_id);
        
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
        const result = await warehouseService.findById(id)
        return res.json(result)
    } catch (error) {
        console.log("error:",error);
        return res.json(error)
    }
}