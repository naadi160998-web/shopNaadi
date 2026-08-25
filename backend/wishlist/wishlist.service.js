const Wishlist = require("./wishlist.model");

// ========================================
// CREATE WISHLIST
// ========================================
const createWishlist = async (params) => {
  try {
    const wishlist = await Wishlist.create(params);

    return wishlist;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ALL WISHLISTS
// ========================================
const getAllWishlists = async () => {
  try {
    const wishlistsList = await Wishlist.find()
      .populate("customer_id")
      .populate("product_id");

    return wishlistsList;
  } catch (error) {
    return error;
  }
};

// ========================================
// READ ONE WISHLIST
// ========================================
const getWishlist = async (id) => {
  try {
    const wishlist = await Wishlist.findById(id)
      .populate("customer_id")
      .populate("product_id");

    if (!wishlist) {
      return {
        success: false,
        message: "Wishlist not found",
      };
    }

    return wishlist;
  } catch (error) {
    return error;
  }
};

// ========================================
// UPDATE WISHLIST
// ========================================
const updateWishlist = async (id, params) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer_id")
      .populate("product_id");

    if (!wishlist) {
      return {
        success: false,
        message: "Wishlist not found",
      };
    }

    return wishlist;
  } catch (error) {
    return error;
  }
};

// ========================================
// DELETE WISHLIST
// ========================================
const deleteWishlist = async (id) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(id);

    if (!wishlist) {
      return {
        success: false,
        message: "Wishlist not found",
      };
    }

    return "Wishlist deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createWishlist,
  getAllWishlists,
  getWishlist,
  updateWishlist,
  deleteWishlist,
};