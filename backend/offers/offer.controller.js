const express = require("express");
const router = express.Router();
const offerServices = require("./offer.service");

// ========================================
// CREATE OFFER
// ========================================
const createOffer = async (req, res) => {
  try {
    const offer = req.body;

    const newOffer =
      await offerServices.createOffer(offer);

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: newOffer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ALL OFFERS
// ========================================
const getAllOffers = async (req, res) => {
  try {
    const offersList =
      await offerServices.getAllOffers();

    res.status(200).json({
      success: true,
      data: offersList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// GET ONE OFFER
// ========================================
const getOffer = async (req, res) => {
  try {
    const offer =
      await offerServices.getOffer(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE OFFER
// ========================================
const updateOffer = async (req, res) => {
  try {
    const offer =
      await offerServices.updateOffer(
        req.params.id,
        req.body
      );

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: offer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE OFFER
// ========================================
const deleteOffer = async (req, res) => {
  try {
    const result =
      await offerServices.deleteOffer(
        req.params.id
      );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ROUTER
// ========================================


module.exports = router;

// CREATE
router.post(
  "/", createOffer
);

// READ ALL
router.get(
  "/",getAllOffers
);

// READ ONE
router.get(
  "/:id",getOffer
);

// UPDATE
router.put(
  "/:id",updateOffer
);

// DELETE
router.delete(
  "/:id",deleteOffer
);