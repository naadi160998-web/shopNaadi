const express = require("express");
const router = express.Router();
const userService = require("./users.service");
const auth = require("../_Auth/auth")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
// routes
router.post("/", createUser);
router.post("/login", login);
router.get("/", auth, getAll);
router.post("/:id", auth, updateUser)
router.delete("/:id", auth, removeUser)
router.post("/userprofileimg/img/:id", auth, uploadUserImg)

module.exports = router

// route function
async function createUser(req, res, next) {
    try {
        const result = await userService.createUser(req.body);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
}

async function login(req, res, next) {
    console.log("call controller");
    try {
        const result = await userService.login(req.body)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

async function getAll(req, res, next) {
    try {
        const result = await userService.getAll();
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

async function updateUser(req, res, next) {
    try {
        const id = req.params.id
        const result = await userService.updateUser(req.body, id)
        return res.json(result)
    } catch (error) {
        res.json(error)
    }
}

async function removeUser(req, res, next) {
    try {
        const id = req.params.id;
        const result = await userService.removeUser(id);
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
}


async function uploadUserImg(req, res, next) {
    try {
        const id = req.params.id;
        console.log("ID:", id);

        const uploadPath = path.join(process.cwd(), "profiles/userProfiles", id);
        console.log("uploadPath:", uploadPath);

        // ✅ Check folder exists
        if (!fs.existsSync(uploadPath)) {
            return res.status(404).json({ error: "User folder not found" });
        }

        // 1. Find user
        const user = await userService.findById(id);
        console.log("*********************user:",user);
        
        // 2. Delete old file if exists
        if (user.profile_img_name) {
            const oldPath = path.join(process.cwd(), "profiles/userProfiles", id, user.profile_img_name);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // Storage config
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        });

        // File filter
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

            const result = await userService.updateUser(req.file, Number(id))
            return res.json(result)
        });
    } catch (error) {
        console.log("*********************error:****************",error);

        return res.json(error)
    }
}