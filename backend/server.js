require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./_helper/db");
const userRoutes = require("./users/users.controller");
const roleRoutes = require("./roles/role.controller");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});