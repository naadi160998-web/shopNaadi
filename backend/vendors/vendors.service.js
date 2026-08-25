require("dotenv").config();

const Vendor = require("./vendors.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// ========================================
// GET ALL VENDORS
// ========================================
async function getAll() {
  try {
    const data = await Vendor.find();

    return data;
  } catch (error) {
    return error;
  }
}

// ========================================
// CREATE VENDOR
// ========================================
async function createVendors(params) {
  try {
    const data = { ...params };

    // ========================================
    // CHECK EMAIL
    // ========================================
    const isEmailExists = await Vendor.findOne({
      vendor_email: data.vendor_email,
    });

    if (isEmailExists) {
      return "Email is already exists";
    }

    // ========================================
    // CHECK VENDOR NAME
    // ========================================
    const isNameExists = await Vendor.findOne({
      vendor_name: data.vendor_name,
    });

    if (isNameExists) {
      return "This name is already exists";
    }

    // ========================================
    // HASH PASSWORD
    // ========================================
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      data.vendor_password,
      salt
    );

    data.vendor_password = hashedPassword;

    // ========================================
    // CREATE VENDOR
    // ========================================
    const createdVendor = await Vendor.create(data);

    // ========================================
    // CREATE VENDOR PROFILE FOLDER
    // ========================================
    const vendorId = createdVendor._id.toString();

    const profileDir = path.join(
      "profiles",
      "vendorProfiles",
      vendorId
    );

    const productImgDir = path.join(
      "productImgs",
      vendorId
    );

    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, {
        recursive: true,
      });
    }

    if (!fs.existsSync(productImgDir)) {
      fs.mkdirSync(productImgDir, {
        recursive: true,
      });
    }

    return {
      message: "Created Successfully",
      data: createdVendor,
    };
  } catch (error) {
    return error;
  }
}

// ========================================
// LOGIN VENDOR
// ========================================
async function login(params) {
  try {
    const {
      vendor_email,
      vendor_password,
    } = params;

    // ========================================
    // CHECK EMAIL
    // ========================================
    const vendor = await Vendor.findOne({
      vendor_email: vendor_email,
    });

    if (!vendor) {
      return "Check your email";
    }

    // ========================================
    // CHECK PASSWORD
    // ========================================
    const matchPwd = await bcrypt.compare(
      vendor_password,
      vendor.vendor_password
    );

    if (!matchPwd) {
      return "Check your password";
    }

    // ========================================
    // JWT
    // ========================================
    const vendorId = vendor._id.toString();

    const payload = {
      vendorId,
    };

    const secretCode = process.env.SCERET_CODE;

    const token = jwt.sign(
      payload,
      secretCode,
      {
        expiresIn: "24h",
      }
    );

    return {
      msg: "Login Successfully",
      token: token,
      data: vendor,
    };
  } catch (error) {
    return error;
  }
}

// ========================================
// UPDATE VENDOR
// ========================================
async function update(params, id) {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!vendor) {
      return {
        complete: false,
        message: "Vendor not found",
      };
    }

    return vendor;
  } catch (error) {
    return {
      complete: false,
      message: error.message,
    };
  }
}

// ========================================
// FIND VENDOR BY ID
// ========================================
async function findById(id) {
  try {
    const data = await Vendor.findById(id);

    return data;
  } catch (error) {
    return error;
  }
}

// ========================================
// UPDATE VENDOR PROFILE IMAGE
// ========================================
async function updateVendor(data, vendorId) {
  try {
    const paths = data;

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        profile_path: paths.path,
        profile_img_name: paths.filename,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return vendor;
  } catch (error) {
    return error;
  }
}

// ========================================
// DELETE VENDOR
// ========================================
async function deleteVendor(id) {
  try {
    const vendor = await Vendor.findByIdAndDelete(id);

    if (!vendor) {
      return {
        complete: false,
        message: "Vendor not found",
      };
    }

    // ========================================
    // DELETE VENDOR PROFILE FOLDER
    // ========================================
    const folderPath = path.join(
      process.cwd(),
      "profiles",
      "vendorProfiles",
      id.toString()
    );

    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, {
        recursive: true,
        force: true,
      });
    }

    return {
      complete: true,
      message: "Vendor deleted successfully",
    };
  } catch (error) {
    return {
      complete: false,
      message: error.message,
    };
  }
}


module.exports = {
  getAll,
  createVendors,
  login,
  updateVendor,
  findById,
  update,
  deleteVendor,
};