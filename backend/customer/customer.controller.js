const express = require("express");
const router = express.Router();
const customerServices = require("./customer.services");
// const auth = require("../_Auth/auth")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

module.exports = router

router.get("/", getAllData);
router.post("/", createCustomer);
router.post("/login", login)
router.post("/customerprofileimg/img/:id", uploadCustomerImg)

async function getAllData(req, res, next) {
    try {
        const result = await customerServices.getAllCustomers();
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function createCustomer(req, res, next) {
    try {
        const result = await customerServices.addCustomers(req.body);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function login(req, res, next) {
    try {
        const data = await req.body
        const result = await customerServices.login(data)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}

async function uploadCustomerImg(req, res, next) {
    try {
        const id = req.params.id;
        const uploadPath = path.join(process.cwd(), "profiles/customerProfiles", id);

        // ✅ Check folder exists
        if (!fs.existsSync(uploadPath)) {
            return res.status(404).json({ error: "Vendor folder not found" });
        }

        // 1. Find user
        const user = await customerServices.findById(id);
        console.log("*********************user:", user);

        // 2. Delete old file if exists
        if (user.profile_img_name) {
            const oldPath = path.join(process.cwd(), "profiles/customerProfiles", id, user.profile_img_name);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        // ✅ Storage config
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        });
        // ✅ File filter
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

            res.json({
                msg: "Image uploaded successfully",
                file: req.file
            });
            await customerServices.updateUser(req.file,id)
        });
    } catch (error) {
        console.log("*********************error:****************", error);

        return res.json(error)
    }
}