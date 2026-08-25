const Category = require("./Category.model");

// CREATE
const createCategory = async (params) => {
  try {
    const category = await Category.create(params);
    return category;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllCategories = async () => {
  try {
    const categoriesList = await Category.find();
    return categoriesList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getCategory = async (id) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    return category;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateCategory = async (id, params) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    return category;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteCategory = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    return "Category deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};