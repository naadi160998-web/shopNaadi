const Role = require("./role.model");

// CREATE
const createRole = async (params) => {
  try {
    const role = await Role.create(params);
    return role;
  } catch (error) {
    return error;
  }
};

// READ ALL
const getRoles = async () => {
  try {
    const roles = await Role.find();

    return roles;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getRole = async (id) => {
  try {
    const role = await Role.findById(id);

    if (!role) {
      return {
        success: false,
        message: "Role not found",
      };
    }

    return role;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateRole = async (id, params) => {
  try {
    const role = await Role.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!role) {
      return {
        success: false,
        message: "Role not found",
      };
    }

    return role;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteRole = async (id) => {
  try {
    const role = await Role.findByIdAndDelete(id);

    if (!role) {
      return {
        success: false,
        message: "Role not found",
      };
    }

    return "Role deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};