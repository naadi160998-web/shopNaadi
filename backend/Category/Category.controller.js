const express = require("express");
const categoryServices = require("./Category.services");

const router = express.Router();

// CREATE
const createCategory = async (req, res) => {
  try {
    const category = req.body;

    const newCategory = await categoryServices.createCategory(category);

    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getAllCategories = async (req, res) => {
  try {
    const categoriesList = await categoryServices.getAllCategories();

    res.json({
      success: true,
      data: categoriesList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getCategory = async (req, res) => {
  try {
    const category = await categoryServices.getCategory(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateCategory = async (req, res) => {
  try {
    const category = await categoryServices.updateCategory(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  try {
    await categoryServices.deleteCategory(req.params.id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = router;

// Routes
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);