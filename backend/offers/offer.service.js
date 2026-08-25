const Offer = require("./offer.model");

// ========================================
// CREATE OFFER
// ========================================
const createOffer = async (params) => {
  try {
    const offer = await Offer.create(params);

    return offer;
  } catch (error) {
    throw error;
  }
};

// ========================================
// GET ALL OFFERS
// ========================================
const getAllOffers = async () => {
  try {
    const offersList = await Offer.find()
      .populate("product_id");

    return offersList;
  } catch (error) {
    throw error;
  }
};

// ========================================
// GET ONE OFFER
// ========================================
const getOffer = async (id) => {
  try {
    const offer = await Offer.findById(id)
      .populate("product_id");

    if (!offer) {
      return null;
    }

    return offer;
  } catch (error) {
    throw error;
  }
};

// ========================================
// UPDATE OFFER
// ========================================
const updateOffer = async (id, params) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    ).populate("product_id");

    if (!offer) {
      return null;
    }

    return offer;
  } catch (error) {
    throw error;
  }
};

// ========================================
// DELETE OFFER
// ========================================
const deleteOffer = async (id) => {
  try {
    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return null;
    }

    return {
      message: "Offer deleted successfully",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOffer,
  getAllOffers,
  getOffer,
  updateOffer,
  deleteOffer,
};