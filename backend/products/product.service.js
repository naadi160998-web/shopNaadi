const Product = require("./product.model");
const fs = require("fs");
const path = require("path");

// ========================================
// CREATE PRODUCT
// ========================================
async function createProduct(params) {
  try {
    const {
      product_name,
      product_desc,
      product_brand,
      old_price,
      product_dealer,
      product_discount,
      product_size,
      new_price,
      product_type,
      product_gender,
      product_color,
      supplier_id,
      vendor_id,
      category_id,
    } = params;

    const product = {
      product_name,
      product_desc,
      product_brand,
      old_price,
      product_dealer,
      product_discount,
      product_size,
      new_price,
      product_type,
      product_gender,
      product_color,
      supplier_id,
      vendor_id,
      category_id,
    };

    if (!product) {
      return {
        completed: false,
        msg: "Values aren't found",
      };
    }

    // ========================================
    // CREATE PRODUCT
    // ========================================

    const newProduct = await Product.create(product);

    // ========================================
    // CREATE PRODUCT FOLDER
    // ========================================

    const folder = path.join(
      "productImgs",
      String(newProduct.vendor_id)
    );

    const newFolders = path.join(
      String(newProduct.product_type || "unknown"),
      String(newProduct.product_gender || "unknown")
    );

    const dir = path.join(folder, newFolders);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }

    // ========================================
    // PRODUCT ID FOLDER
    // ========================================

    const productIdDir = path.join(
      dir,
      String(newProduct._id)
    );

    if (!fs.existsSync(productIdDir)) {
      fs.mkdirSync(productIdDir, {
        recursive: true,
      });
    }

    return {
      msg: "Product created successfully",
      data: newProduct,
    };

  } catch (error) {
    console.log("Create product error:", error);

    return {
      completed: false,
      message: "Something went wrong",
      error: error.message,
    };
  }
}


// ========================================
// GET PRODUCTS BY VENDOR ID
// ========================================
async function getProductUserId(vendorId) {
  try {
    const products = await Product.find({
      vendor_id: vendorId,
    })
      .populate("supplier_id")
      .populate("vendor_id")
      .populate("category_id");

    if (!products || products.length === 0) {
      return {
        success: false,
        message: "Products not found",
      };
    }

    return products;

  } catch (error) {
    console.log("Get vendor products error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}


// ========================================
// FIND PRODUCT BY ID
// ========================================
async function findById(id) {
  try {
    const product = await Product.findById(id)
      .populate("supplier_id")
      .populate("vendor_id")
      .populate("category_id");

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    return product;

  } catch (error) {
    console.log("Find product error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}


// ========================================
// GET ALL PRODUCTS
// ========================================
async function getAllProducts() {
  try {
    const products = await Product.find()
      .populate("supplier_id")
      .populate("vendor_id")
      .populate("category_id");

    if (!products || products.length === 0) {
      return {
        success: false,
        message: "Products not found",
      };
    }

    return products;

  } catch (error) {
    console.log("Get all products error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}


// ========================================
// UPDATE PRODUCT
// ========================================
async function updateProduct(product, product_id) {
  try {
    const items = await product;

    const updatedProduct = await Product.findByIdAndUpdate(
      product_id,
      items,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    return {
      data: updatedProduct,
      msg: "Product updated successfully",
    };

  } catch (error) {
    console.log("Update product error:", error);

    return {
      success: false,
      data: error,
      msg: "Failed to update product",
    };
  }
}


// ========================================
// DELETE PRODUCT
// ========================================
async function deleteProduct(product_id, vendor_id) {
  try {

    // ========================================
    // FIND PRODUCT
    // ========================================

    const product = await Product.findOne({
      _id: product_id,
      vendor_id: vendor_id,
    });

    if (!product) {
      return {
        completed: false,
        message: "Product not found",
      };
    }


    // ========================================
    // DELETE PRODUCT
    // ========================================

    await Product.findByIdAndDelete(product_id);


    // ========================================
    // DELETE PRODUCT IMAGE FOLDER
    // ========================================

    const folderPath = path.join(
      process.cwd(),
      "productImgs",
      String(vendor_id),
      String(product.product_type || "unknown"),
      String(product.product_gender || "unknown"),
      String(product._id)
    );

    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, {
        recursive: true,
        force: true,
      });
    }


    return {
      completed: true,
      message: "Product deleted successfully",
    };

  } catch (error) {

    console.log("Delete product error:", error);

    return {
      completed: false,
      message: error.message,
    };
  }
}

module.exports = {
  createProduct,
  getProductUserId,
  updateProduct,
  deleteProduct,
  getAllProducts,
  findById,
};