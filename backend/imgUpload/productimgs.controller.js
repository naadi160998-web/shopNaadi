const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const productimgService = require("./productimgs.service");


// ========================================
// CREATE FOLDER
// ========================================

const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true,
    });
  }
};


// ========================================
// MULTER STORAGE
// ========================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    try {

      const {
        vendor_id,
        product_id,
        gender,
        color,
        size,
        product_type,
      } = req.params;


      const folderPath = path.join(
        process.cwd(),
        "uploads",
        "products",
        String(vendor_id),
        String(product_id),
        String(product_type),
        String(gender),
        String(color),
        String(size)
      );


      createFolder(folderPath);

      cb(null, folderPath);

    } catch (error) {

      console.log(
        "Create folder error:",
        error
      );

      cb(error);
    }
  },


  filename: (req, file, cb) => {

    cb(
      null,
      file.originalname
    );
  },
});


// ========================================
// MULTER
// ========================================

const upload = multer({
  storage,
});

const uploadSingle = multer({
  storage,
}).single("image");


// ========================================
// REMOVE EMPTY FOLDERS
// ========================================

const removeEmptyFolders = (dir) => {

  if (!fs.existsSync(dir)) {
    return;
  }


  if (fs.readdirSync(dir).length === 0) {

    fs.rmdirSync(dir);

    removeEmptyFolders(
      path.dirname(dir)
    );
  }
};


// ========================================
// UPLOAD PRODUCT IMAGES
// ========================================

router.post(
  "/upload/:vendor_id/:product_id/:gender/:color/:size/:product_type/:category_id",

  upload.fields([
    {
      name: "single",
      maxCount: 1,
    },
    {
      name: "multiple",
      maxCount: 5,
    },
  ]),

  async (req, res) => {

    try {

      const {
        vendor_id,
        product_id,
        category_id,
      } = req.params;


      const files = [];


      // ========================================
      // SINGLE IMAGE
      // ========================================

      const singleFiles =
        req.files?.single || [];


      const single = singleFiles.map(
        (file) => file.path
            .replace(/\\/g, "/")
            .split("/")
            .slice(6)
            .join("/")
      );

      console.log("single:",single);
      

      // ========================================
      // MULTIPLE IMAGES
      // ========================================

      const multipleFiles =
        req.files?.multiple || [];


      const multiple = multipleFiles.map(
        (file) =>
          file.path
            .replace(/\\/g, "/")
            .split("/")
            .slice(6)
            .join("/")
      );


      // ========================================
      // COMBINE IMAGES
      // ========================================

      files.push(...single);

      files.push(...multiple);


      // Remove duplicate paths
      const uniquePaths = [
        ...new Set(files),
      ];


      console.log(
        "******** uniquePaths:",
        uniquePaths
      );


      if (uniquePaths.length === 0) {

        return res.status(400).json({
          success: false,
          message: "No images uploaded",
        });
      }


      // ========================================
      // MONGOOSE SERVICE
      // ========================================

      const result =
        await productimgService.uploadProductImgs(
          uniquePaths,
          vendor_id,
          product_id,
          category_id
        );


      return res.json(result);

    } catch (error) {

      console.error(
        "Upload image error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ========================================
// DELETE PRODUCT IMAGE
// ========================================

router.post(
  "/delete",
  async (req, res) => {

    try {

      const {
        product_img_src,
        product_id,
        vendor_id,
        product_img_id,
      } = req.body;


      console.log(
        "Delete image:",
        {
          product_img_src,
          product_id,
          vendor_id,
          product_img_id,
        }
      );


      if (!product_img_src) {

        return res.status(400).json({
          success: false,
          message: "Image path required",
        });
      }


      // ========================================
      // FULL FILE PATH
      // ========================================

      const fullPath = path.join(
        process.cwd(),
        product_img_src
      );


      // ========================================
      // DELETE PHYSICAL FILE
      // ========================================

      if (fs.existsSync(fullPath)) {

        fs.unlinkSync(fullPath);

        console.log(
          "File deleted:",
          fullPath
        );

      } else {

        console.log(
          "File not found:",
          fullPath
        );
      }


      // ========================================
      // REMOVE EMPTY FOLDERS
      // ========================================

      removeEmptyFolders(
        path.dirname(fullPath)
      );


      // ========================================
      // DELETE MONGODB RECORD
      // ========================================

      const result =
        await productimgService.deleteImgPath({
          product_img_id,
          product_img_src,
          product_id,
          vendor_id,
        });


      return res.json({
        success: true,
        message: "Image deleted successfully",
        path: product_img_src,
        data: result,
      });

    } catch (error) {

      console.error(
        "Delete image error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ========================================
// UPDATE / REPLACE PRODUCT IMAGE
// ========================================

router.put(
  "/update/:vendor_id/:product_id/:gender/:color/:size/:product_type/:category_id/:product_img_id",

  (req, res) => {

    uploadSingle(
      req,
      res,
      async (err) => {

        try {

          // ========================================
          // MULTER ERROR
          // ========================================

          if (err) {

            return res.status(400).json({
              success: false,
              message: err.message,
            });
          }


          // ========================================
          // BODY
          // ========================================

          const {
            oldImagePath,
          } = req.body;


          console.log(
            "******** oldImagePath:",
            oldImagePath
          );


          // ========================================
          // PARAMS
          // ========================================

          const {
            vendor_id,
            product_id,
            product_img_id,
          } = req.params;


          // ========================================
          // VALIDATION
          // ========================================

          if (!oldImagePath) {

            return res.status(400).json({
              success: false,
              message: "Old image path required",
            });
          }


          if (!req.file) {

            return res.status(400).json({
              success: false,
              message: "New image required",
            });
          }


          // ========================================
          // NEW IMAGE PATH
          // ========================================

          const newImagePath =
            req.file.path
              .replace(/\\/g, "/")
              .split("/")
              .slice(8)
              .join("/");


          console.log(
            "******** newImagePath:",
            newImagePath
          );


          if (!newImagePath) {

            return res.status(400).json({
              success: false,
              message: "Image path required",
            });
          }


          // ========================================
          // DELETE OLD FILE
          // ========================================

          const oldFullPath =
            path.join(
              process.cwd(),
              oldImagePath
            );


          if (fs.existsSync(oldFullPath)) {

            fs.unlinkSync(oldFullPath);

            console.log(
              "Old file deleted:",
              oldFullPath
            );

          } else {

            console.log(
              "Old file not found:",
              oldFullPath
            );
          }


          // ========================================
          // REMOVE EMPTY FOLDERS
          // ========================================

          removeEmptyFolders(
            path.dirname(oldFullPath)
          );


          // ========================================
          // UPDATE MONGODB RECORD
          // ========================================

          const result =
            await productimgService.updateProductImgs(
              newImagePath,
              vendor_id,
              product_id,
              product_img_id
            );


          return res.json({
            success: true,
            message: "Image replaced successfully",
            data: result,
            newImage: newImagePath,
          });

        } catch (error) {

          console.error(
            "Replace image error:",
            error
          );

          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      }
    );
  }
);


module.exports = router;