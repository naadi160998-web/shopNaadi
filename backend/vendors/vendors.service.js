require("dotenv")
const db = require("../_helper/db");
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports = {
    getAll,
    createVendors,
    login,
    updateVendor,
    findById,
    update,
    deleteVendor
}

async function getAll() {
    try {
        const data = await db.Vendors.findAll();
        return data
    } catch (error) {
        return error
    }
}

async function createVendors(params) {
    try {
        const data = await params
        // const vendorData = {
        //     vendor_name: "Naadi",
        //     vendor_email: "naadi@gmail.com",
        //     vendor_password: "naadi123",
        // }
        // isExitEmail 
        const isEmailExits = await db.Vendors.findAll({where:{vendor_email:data.vendor_email}})
        if(isEmailExits.length !== 0) return "Email  is already exits"
        // isExitsUsername
        const isNameExits = await db.Vendors.findAll({where:{vendor_name:data.vendor_name}})
        if(isNameExits.length !== 0) return "This name is already exits"

        // hash pwd
        const salt = await bcrpt.genSalt(10);
        const hasPwd = await bcrpt.hash(data.vendor_password,salt);
        data.vendor_password = hasPwd
        await db.Vendors.create(data)
        // get created vendor
        const createdVendor = await db.Vendors.findOne({where:{vendor_email:data.vendor_email}})
        // user Profile folder

        const dir = path.join("profiles/vendorProfiles", JSON.stringify(createdVendor.vendor_id));
        const dirProductImg = path.join("productImgs", JSON.stringify(createdVendor.vendor_id));
        if (!fs.existsSync(dir) || !fs.existsSync(dirProductImg)) {
            fs.mkdirSync(dir, { recursive: true });
            fs.mkdirSync(dirProductImg, {recursive:true});
        }
        return "Created Successfully"
    } catch (error) {
        return error
    }
}

async function login(params) {
    try {
        const {vendor_email,vendor_password} = await params
        // isEmailExists
        const isEmailExits = await db.Vendors.findOne({where:{vendor_email:vendor_email}})
        if(isEmailExits.length === 0) return "Check your email";
        // match pwd
        const matchPwd = await bcrpt.compare(vendor_password,isEmailExits.vendor_password)
        if(!matchPwd) return "Check your password" 

        const vendorId = isEmailExits.vendor_id
        const payload = {vendorId};
        const secretCode = process.env.SCERET_CODE;
        const token = jwt.sign(payload,secretCode,{expiresIn:"24h"});
        return {msg:"Login Successfully",token:token,data:isEmailExits}
    } catch (error) {
        return error
    }
}

async function update(params,id) {
    try {
        const vendorid = await id;
        const vendor = await params;
        await db.Vendors.update(vendor,{where:{vendor_id:vendorid}})
        let data = await db.Vendors.findOne({where:{vendor_id:vendorid}})
        return data
    } catch (error) {
        return {complete:false}
    }
}

async function findById(id) {
    try {
        const data = await db.Vendors.findOne({where:{vendor_id:id}})   
        return data
    } catch (error) {
        return error
    }
}

async function updateVendor(data,vendorId) {
    try {
        const paths =await data
        await db.Vendors.update({profile_path:paths.path,profile_img_name:paths.filename},{where:{vendor_id:vendorId}})
        let result = await db.Vendors.findOne({where:{vendor_id:vendorId}})
        return result
    } catch (error) {
        return error
    }
}

async function deleteVendor(id) {
    try {
        const vId = await id;
        await db.Vendors.destroy({where:{vendor_id:vId}})
        const folderPath = path.join(
            process.cwd(),
            "profiles/vendorProfiles",
            id
        );

        if (fs.existsSync(folderPath)) {
            fs.rmSync(folderPath, { recursive: true, force: true });
        }
        return {complete:true}
    } catch (error) {
        return {complete:false}
    }
}