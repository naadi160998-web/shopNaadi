const brands = require("./brand.model");

// CREATE
const createBrand = async (params) => {
  try {
    const brand = await brands.create(params);
    return brand;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getAllBrands = async () => {
  try {
    const brandsList = await brands.find();
    return brandsList;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getBrand = async (id) => {
  try {
    const brand = await brands.findById(id);

    if (!brand) {
      return {
        success: false,
        message: "Brand not found",
      };
    }

    return brand;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateBrand = async (id, params) => {
  try {
    const brand = await brands.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!brand) {
      return {
        success: false,
        message: "Brand not found",
      };
    }

    return brand;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteBrand = async (id) => {
  try {
    const brand = await brands.findByIdAndDelete(id);

    if (!brand) {
      return {
        success: false,
        message: "Brand not found",
      };
    }

    return "Brand deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};