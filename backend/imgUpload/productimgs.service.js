const ProductImgSrc = require("./productimgs.model");

module.exports = {
  uploadProductImgs,
  deleteImgPath,
  getImgData,
  updateProductImgs,
};


// ========================================
// UPLOAD PRODUCT IMAGES
// ========================================

async function uploadProductImgs(
  files,
  vendor_id,
  product_id,
  category_id
) {
  try {

    // files should contain image paths
    const imageRecords = files.map((file) => ({
      product_img_src: file,

      vendor_id: vendor_id,

      product_id: product_id,

      category_id: category_id,
    }));


    // ========================================
    // CHECK EXISTING IMAGES
    // ========================================

    const existingRecords =
      await ProductImgSrc.find({
        vendor_id,
        product_id,
        category_id,
      });


    const existingPaths = existingRecords.map(
      (record) => record.product_img_src
    );


    // ========================================
    // REMOVE DUPLICATE IMAGES
    // ========================================

    const newRecords = imageRecords.filter(
      (record) =>
        !existingPaths.includes(
          record.product_img_src
        )
    );


    // ========================================
    // INSERT NEW IMAGES
    // ========================================

    if (newRecords.length > 0) {
      await ProductImgSrc.insertMany(
        newRecords
      );
    }


    // ========================================
    // GET IMAGE DATA
    // ========================================

    const imgData = await getImgData(
      vendor_id,
      product_id,
      category_id
    );


    return {
      msg: "Created Successfully",
      data: imgData,
    };

  } catch (error) {

    console.error(
      "Upload image error:",
      error
    );

    return {
      msg: "Error while uploading images",
      error: error.message,
    };
  }
}


// ========================================
// UPDATE PRODUCT IMAGE
// ========================================

async function updateProductImgs(
  files,
  vendor_id,
  product_id,
  product_img_id
) {
  try {

    console.log(
      "********** imageRecords:",
      files
    );


    // If files is a single image path
    const imagePath = Array.isArray(files)
      ? files[0]
      : files;


    const updatedImage =
      await ProductImgSrc.findOneAndUpdate(
        {
          _id: product_img_id,

          vendor_id: vendor_id,

          product_id: product_id,
        },

        {
          product_img_src: imagePath,
        },

        {
          new: true,

          runValidators: true,
        }
      );


    if (!updatedImage) {
      return {
        msg: "Image not found",
      };
    }


    return {
      msg: "Updated Successfully",
      data: updatedImage,
    };

  } catch (error) {

    console.error(
      "Update image error:",
      error
    );

    return {
      msg: "Error while updating image",
      error: error.message,
    };
  }
}


// ========================================
// GET IMAGE DATA
// ========================================

async function getImgData(
  vendor_id,
  product_id,
  category_id
) {
  try {

    const imgData =
      await ProductImgSrc.find({
        vendor_id,

        product_id,

        category_id,
      });


    return imgData;

  } catch (error) {

    console.error(
      "Get image data error:",
      error
    );

    throw new Error(
      "Error fetching image data"
    );
  }
}


// ========================================
// DELETE IMAGE
// ========================================

async function deleteImgPath(params) {
  try {

    const {
      product_img_id,
      imagePath,
      product_id,
      vendor_id,
    } = params;


    // ========================================
    // DELETE DATABASE RECORD
    // ========================================

    const deletedImage =
      await ProductImgSrc.findOneAndDelete({
        _id: product_img_id,

        vendor_id: vendor_id,

        product_id: product_id,
      });


    if (!deletedImage) {
      return {
        msg: "Image not found",
      };
    }


    // ========================================
    // DELETE PHYSICAL FILE
    // ========================================

    const filePath =
      imagePath ||
      deletedImage.product_img_src;


    if (filePath) {

      const fullPath =
        path.resolve(filePath);


      if (fs.existsSync(fullPath)) {

        fs.unlinkSync(fullPath);

        console.log(
          "Image file deleted:",
          fullPath
        );
      }
    }


    return {
      msg: "Deleted Successfully",
    };

  } catch (error) {

    console.error(
      "Delete image error:",
      error
    );

    return {
      msg: error.message,
    };
  }
}