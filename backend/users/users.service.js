const User = require("./users.model");

// CREATE
const createUser = async (params) => {
  try {
    const user = await User.create(params);
    return user
  } catch (error) {
    return error;
  }
};

// READ ALL
const getUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (error) {
    return error;
  }
};

// READ ONE
const getUser = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return user;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateUser = async (id, params) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      params,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return user;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return "User deleted successfully";
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};