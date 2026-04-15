const express = require("express");
const router = express.Router();
const roleServices = require("./role.services");
const auth = require("../_Auth/auth");

module.exports = router

// router create
router.post("/",auth,createRoles)
router.get("/",getRoles)
router.post("/:id",auth,updateRoles)
router.delete("/:id",auth,removeRoles)

// route function
async function createRoles(req,res,next) {
    try {
        const result = await roleServices.createRole(req.body)
        return res.json({
            status:201,
            msg:"Done"
        })
    } catch (error) {
        return error
    }
}

async function getRoles(req,res,next) {
    try {
        // console.log("controllers:***********************************");
        
        const result = await roleServices.getRoles(); 
        return res.json({
            status:200,
            result:result
        })
    } catch (error) {
        return error
    }
}

async function updateRoles(req,res,next) {
    try {
        const id = req.params.id
        const result = await roleServices.updateRole(req.body,id)
        return res.json({
            status:200,
            result:result
        })
    } catch (error) {
        return error
    }
}

async function removeRoles(req,res,next) {
    try {
        const id = req.params.id
        const result = await roleServices.removeRole(id)
        return res.json({
            status:200,
            result:result
        })
    } catch (error) {
        return error
    }
}