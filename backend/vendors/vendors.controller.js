const express = require("express");
const router = express.Router();

const vendorServices = require("./vendors.service");
const auth = require("../_Auth/auth");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ========================================
// GET ALL VENDORS
// ========================================

async function getAll(req, res) {
  try {
    const result = await vendorServices.getAll();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ========================================
// CREATE VENDOR
// ========================================

async function createVendor(req, res) {
  try {
    const data = req.body;

    console.log(
      "*************** Data ***************:",
      data
    );

    const result =
      await vendorServices.createVendors(data);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ========================================
// LOGIN
// ========================================

async function login(req, res) {
  try {
    const data = req.body;

    const result =
      await vendorServices.login(data);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

// ========================================
// UPDATE VENDOR
// ========================================

async function update(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const result =
      await vendorServices.update(data, id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ========================================
// UPLOAD VENDOR PROFILE IMAGE
// ========================================

async function uploadVendorImg(req, res) {
  try {
    const id = req.params.id;

    // ========================================
    // CHECK MONGODB OBJECT ID
    // ========================================

    const mongoose = require("mongoose");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vendor ID",
      });
    }

    // ========================================
    // VENDOR UPLOAD PATH
    // ========================================

    const uploadPath = path.join(
      process.cwd(),
      "profiles",
      "vendorProfiles",
      id
    );

    // ========================================
    // CHECK FOLDER
    // ========================================

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, {
        recursive: true,
      });
    }

    // ========================================
    // FIND VENDOR
    // ========================================

    const vendor =
      await vendorServices.findById(id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // ========================================
    // MULTER STORAGE
    // ========================================

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },

      filename: (req, file, cb) => {
        const fileName =
          Date.now() +
          "-" +
          file.originalname.replace(/\s+/g, "-");

        cb(null, fileName);
      },
    });

    // ========================================
    // FILE FILTER
    // ========================================

    const fileFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(
          new Error("Only image files are allowed"),
          false
        );
      }
    };

    // ========================================
    // MULTER
    // ========================================

    const upload = multer({
      storage,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter,
    }).single("image");

    // ========================================
    // UPLOAD
    // ========================================

    upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }

        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "Please select an image",
          });
        }

        console.log("req.file:", req.file);

        // ========================================
        // DELETE OLD IMAGE
        // ========================================

        if (vendor.profile_img_name) {
          const oldPath = path.join(
            uploadPath,
            vendor.profile_img_name
          );

          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }

        // ========================================
        // UPDATE MONGODB
        // ========================================

        const result =
          await vendorServices.updateVendor(
            req.file,
            id
          );

        return res.status(200).json({
          success: true,
          data: result,
        });
      } catch (error) {
        console.log("Upload error:", error);

        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ========================================
// DELETE VENDOR
// ========================================

async function deleteVendor(req, res) {
  try {
    const id = req.params.id;

    const result =
      await vendorServices.deleteVendor(id);

    if (!result.complete) {
      return res.status(404).json(result);
    }

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = router;

// ========================================
// ROUTES
// ========================================

router.get("/", getAll);

router.post("/", createVendor);

router.post("/login", login);

router.put("/:id", auth, update);

router.post(
  "/vendorprofileimg/img/:id",
  auth,
  uploadVendorImg
);

router.delete("/:id", auth, deleteVendor);