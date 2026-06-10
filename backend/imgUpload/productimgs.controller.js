const express = require("express");
const router = express.Router();
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const auth = require("../_Auth/auth");
const productimgService = require("./productimgs.service");

module.exports = router;

const createFolder = (folderPath) =>{
  if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, {recursive:true})
  }
}
// route function
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const {vendor_id,product_id,gender,color,size,product_type} = req.params
      // console.log("**********************params:",{vendor_id,product_id,gender,color,size,product_type});
      
      const folderPaths = path.join(
        process.cwd(),
        "uploads",
        "products",
        vendor_id,
        product_id,
        product_type,
        gender,
        color,
        size
      )

      createFolder(folderPaths)
      cb(null, folderPaths)
    } catch (error) {
      console.log("create folder error:",error)
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const removeEmptyFolders = (dir) => {
  if (fs.existsSync(dir)) {
    if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
      removeEmptyFolders(path.dirname(dir));
    }
  }
};

const upload = multer({ storage });
const uploadSingle = multer({ storage }).single("image");

// upload
// Routes
router.post(
  "/upload/:vendor_id/:product_id/:gender/:color/:size/:product_type/:category_id",
  upload.fields([
    { name: "single", maxCount: 1 },
    { name: "multiple", maxCount: 5 },
  ]),
  async (req, res) => {

      const {vendor_id,product_id,category_id} = req.params;
    
      const files = []
      const single = req.files.single ? req.files.single.map(e => {return e.path.split("\\").slice(8).join("/")}) : false;
      const multiple = req.files.multiple ? req.files.multiple.map(e => {return e.path.split("\\").slice(8).join("/")}) : false ;
      // console.log("9********************single:",single);
      
      if(single){
        files.push(...single)
      }
      if(multiple){
        files.push(...multiple)
      }

      const uniquePaths = [...new Set(files)]
      
      console.log("*************uniquePaths:",uniquePaths);
      
    const result = await productimgService.uploadProductImgs(uniquePaths,vendor_id,product_id,category_id)
      console.log("result:",result);
      
    res.json(result);
  }
);

router.post("/delete",async (req, res) => {
  try {
    const { product_img_src, product_id, vendor_id, product_img_id } =await req.body;
    console.log("imagePath, product_id, vendor_id:",{product_img_src, product_id, vendor_id, product_img_id});
    
    if (!product_img_src) {
      return res.status(400).json({ message: "Image path required" });
    }

    // 🔥 full system path
    const fullPath = path.join(process.cwd(), product_img_src);

    // ✅ 1. Delete file from folder
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("File deleted:", fullPath);
    } else {
      console.log("File not found:", fullPath);
    }

    // call it
    removeEmptyFolders(path.dirname(fullPath));

    // ✅ 2. Remove from DB
    const result = await productimgService.deleteImgPath(
      { product_img_id, product_img_src, product_id, vendor_id }
    );

    // console.log("result:",result);
    

    res.json({
      message: "Image deleted successfully",
      path: product_img_src,
    });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: error.message });
  }
})

// update images
router.put(
  "/update/:vendor_id/:product_id/:gender/:color/:size/:product_type/:category_id/:product_img_id",
  (req, res) => {

    uploadSingle(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        // ✅ NOW multer has parsed body
        const { oldImagePath } = req.body;
        console.log("**********oldImagePath:",req.body);

        const { vendor_id, product_id, product_img_id} = req.params
        if (!oldImagePath) {
          return res.status(400).json({ message: "Old image path required" });
        }

        if (!req.file) {
          return res.status(400).json({ message: "New image required" });
        }

        const newImagePath = req.file.path.replace(/\\/g, "/").split("/").slice(8).join("/");
        console.log("***********newImagePath:",newImagePath);

        if (!newImagePath) {
      return res.status(400).json({ message: "Image path required" });
    }

        const fullPath = path.join(process.cwd(), oldImagePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log("File deleted:", fullPath);
        } else {
          console.log("File not found:", fullPath);
        }

        removeEmptyFolders(path.dirname(fullPath));
        
        const result = productimgService.updateProductImgs(newImagePath, vendor_id, product_id, product_img_id)

        // res.json({
        //   message: "Image replaced successfully",
        //   newImage: newImagePath,
        // });

      } catch (error) {
        console.error("Replace Error:", error);
        res.status(500).json({ error: error.message });
      }
    });
  }
);