const express = require("express");
const router = express.Router();
const productService = require("./product.service");

// ========================================
// CREATE PRODUCT
// ========================================

async function createProduct(req, res, next) {
  try {
    const data = req.body;

    console.log(
      "**************** data *****************:",
      data
    );

    const result = await productService.createProduct(data);

    return res.status(201).json(result);

  } catch (error) {
    console.log("Create product controller error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}


// ========================================
// GET PRODUCTS BY VENDOR ID
// ========================================

async function getProductUserId(req, res, next) {
  try {
    const id = req.params.id;

    console.log(
      "*************** vendor id:",
      id
    );

    const result =
      await productService.getProductUserId(id);

    return res.json(result);

  } catch (error) {
    console.log(
      "Get products by vendor error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// ========================================
// GET ALL PRODUCTS
// ========================================

async function getAllProducts(req, res, next) {
  try {

    const result =
      await productService.getAllProducts();

    return res.json(result);

  } catch (error) {

    console.log(
      "Get all products error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// ========================================
// UPDATE PRODUCT
// ========================================

async function updateProduct(req, res, next) {
  try {

    const data = req.body;

    const product_id = req.params.id;

    console.log(
      "*************** product id:",
      product_id
    );

    console.log(
      "*************** update data:",
      data
    );

    const result =
      await productService.updateProducts(
        data,
        product_id
      );

    return res.json(result);

  } catch (error) {

    console.log(
      "Update product error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}


// ========================================
// DELETE PRODUCT
// ========================================

async function deleteProduct(req, res, next) {
  try {

    console.log(
      "req.params:",
      req.params
    );

    const {
      product_id,
      vendor_id
    } = req.params;

    const obj = req.body;

    const result =
      await productService.deleteProducts(
        product_id,
        vendor_id,
        obj
      );

    return res.json(result);

  } catch (error) {

    console.log(
      "Delete product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// ========================================
// GET PRODUCT BY ID
// ========================================

async function findById(req, res, next) {
  try {

    console.log(
      "******** product id ********:",
      req.params.id
    );

    const id = req.params.id;

    const result =
      await productService.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.log(
      "Find product error:",
      error
    );

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

// CREATE PRODUCT
router.post("/", createProduct);

// GET PRODUCTS BY VENDOR ID
router.get("/vendor/:id", getProductUserId);

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// UPDATE PRODUCT
router.put("/update/:id", updateProduct);

// DELETE PRODUCT
router.post("/delete/:product_id/:vendor_id", deleteProduct);

// GET PRODUCT BY ID
router.get("/:id", findById);
