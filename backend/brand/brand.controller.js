const express = require("express");
const brandServices = require("./brand.service");
const router = express.Router();

// CREATE
const createBrand = async (req, res) => {
  try {
    const brand = await req.body;
    const newBrand = await brandServices.createBrand(brand);
    res.status(201).json({
      success: true,
      data: newBrand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllBrands = async (req, res) => {
  try {
    const brandsList = await brandServices.getAllBrands();

    res.json({
      success: true,
      data: brandsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getBrand = async (req, res) => {
  try {
    const brand = await brandServices.getBrand(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateBrand = async (req, res) => {
  try {
    const brand = await brandServices.updateBrand(req.params.id, req.body);

    res.json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteBrand = async (req, res) => {
  try {
    await brandServices.deleteBrand(req.params.id);

    res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = router;

router.post("/", createBrand);
router.get("/", getAllBrands);
router.get("/:id", getBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);