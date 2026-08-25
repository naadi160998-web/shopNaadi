const express = require("express");
const wishlistServices = require("./wishlist.service");

const router = express.Router();

// ========================================
// CREATE WISHLIST
// ========================================
const createWishlist = async (req, res) => {
  try {
    const wishlist = req.body;

    const newWishlist =
      await wishlistServices.createWishlist(wishlist);

    res.status(201).json({
      success: true,
      data: newWishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ALL WISHLISTS
// ========================================
const getAllWishlists = async (req, res) => {
  try {
    const wishlistsList =
      await wishlistServices.getAllWishlists();

    res.status(200).json({
      success: true,
      data: wishlistsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// READ ONE WISHLIST
// ========================================
const getWishlist = async (req, res) => {
  try {
    const wishlist =
      await wishlistServices.getWishlist(req.params.id);

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE WISHLIST
// ========================================
const updateWishlist = async (req, res) => {
  try {
    const wishlist =
      await wishlistServices.updateWishlist(
        req.params.id,
        req.body
      );

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE WISHLIST
// ========================================
const deleteWishlist = async (req, res) => {
  try {
    const result =
      await wishlistServices.deleteWishlist(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist deleted successfully",
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

router.post("/", createWishlist);

router.get("/", getAllWishlists);

router.get("/:id", getWishlist);

router.put("/:id", updateWishlist);

router.delete("/:id", deleteWishlist);

module.exports = router;