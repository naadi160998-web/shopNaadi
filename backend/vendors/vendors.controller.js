const express = require("express");
const router = express.Router();
const vendorServices = require("./vendors.service");
const auth = require("../_Auth/auth");
const multer = require("multer")
const fs = require("fs")
const path = require("path")

module.exports = router

router.get("/", getAll)
router.post("/", createVendor)
router.post("/login", login)
router.post("/:id",auth,update)
router.post("/vendorprofileimg/img/:id", auth, uploadVendorImg)
router.delete("/:id",auth,deleteVendor)

async function getAll(req, res, next) {
    try {
        const result = await vendorServices.getAll();
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function createVendor(req, res, next) {
    try {
        const data = await req.body
        console.log("***************Data***************:",data);
        
        const result = await vendorServices.createVendors(data)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function login(req, res, next) {
    try {
        const data = await req.body
        const result = await vendorServices.login(data);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function update(req,res,next) {
    try {
        const id = await req.params.id;
        const data = await req.body
        const result = await vendorServices.update(data,id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function uploadVendorImg(req, res, next) {
    try {
        const id = await req.params.id;
        const uploadPath = path.join(process.cwd(), "profiles/vendorProfiles", id);
        
        // Check folder exists
        if (!fs.existsSync(uploadPath)) {
            return res.status(404).json({ error: "Vendor folder not found" });
        }

        // 1. Find user
        const user = await vendorServices.findById(id);

        // 2. Delete old file if exists
        if (user.profile_img_name) {
            const oldPath = path.join(process.cwd(), "profiles/vendorProfiles", id, user.profile_img_name);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        //  Storage config
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        });
        //  File filter
        const fileFilter = (req, file, cb) => {
            if (file.mimetype.startsWith("image/")) {
                cb(null, true);
            } else {
                cb(new Error("Images only allowed"));
            }
        };
        const upload = multer({
            storage,
            limits: { fileSize: 10 * 1024 * 1024 },
            fileFilter
        }).single("image");

        upload(req, res, async function (err) {

            if (err) {
                return res.status(400).json({ error: err.message });
            }

            console.log("req.file:",req.file);
            
            const result = await vendorServices.updateVendor(req.file,Number(id))
            res.json(result);
        });
    } catch (error) {
        console.log("error:", error);
        return res.json(error)
    }
}

async function deleteVendor(req,res,next) {
    try {
        const id = await req.params.id;
        const result = await vendorServices.deleteVendor(id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}