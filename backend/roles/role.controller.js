const express = require("express");
const roleServices = require("./role.services");
const router = express.Router();

// CREATE
const createRole = async (req, res) => {
  try {
    const role = await req.body;
    const newRole = await roleServices.createRole(role);
    res.status(201).json({
      success: true,
      data: newRole,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
const getRoles = async (req, res) => {
  try {
    const roles = await roleServices.getRoles();

    res.json({
      success: true,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ONE
const getRole = async (req, res) => {
  try {
    const role = await roleServices.getRole(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.json({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateRole = async (req, res) => {
  try {
    const role = await roleServices.updateRole(req.params.id, req.body);

    res.json({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteRole = async (req, res) => {
  try {
    await roleServices.deleteRole(req.params.id);

    res.json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = router;

router.post("/", createRole);
router.get("/", getRoles);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);