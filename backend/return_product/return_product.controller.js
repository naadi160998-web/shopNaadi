const express = require("express");
const returnProductServices = require("./return_product.service");

const router = express.Router();

// ========================================
// CREATE RETURN PRODUCT
// ========================================
const createReturnProduct = async (req, res) => {
  try {
    const returnProduct = req.body;

    const newReturnProduct =
      await returnProductServices.createReturnProduct(returnProduct);

    res.status(201).json({
      success: true,
      data: newReturnProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL RETURN PRODUCTS
// ========================================
const getAllReturnProducts = async (req, res) => {
  try {
    const returnProductsList =
      await returnProductServices.getAllReturnProducts();

    res.json({
      success: true,
      data: returnProductsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE RETURN PRODUCT
// ========================================
const getReturnProduct = async (req, res) => {
  try {
    const returnProduct =
      await returnProductServices.getReturnProduct(req.params.id);

    if (!returnProduct) {
      return res.status(404).json({
        success: false,
        message: "Return product not found",
      });
    }

    res.json({
      success: true,
      data: returnProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE RETURN PRODUCT
// ========================================
const updateReturnProduct = async (req, res) => {
  try {
    const returnProduct =
      await returnProductServices.updateReturnProduct(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: returnProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE RETURN PRODUCT
// ========================================
const deleteReturnProduct = async (req, res) => {
  try {
    await returnProductServices.deleteReturnProduct(req.params.id);

    res.json({
      success: true,
      message: "Return product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ROUTES
// ========================================

router.post("/", createReturnProduct);
router.get("/", getAllReturnProducts);
router.get("/:id", getReturnProduct);
router.put("/:id", updateReturnProduct);
router.delete("/:id", deleteReturnProduct);

module.exports = router;