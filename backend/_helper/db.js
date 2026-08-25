const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://naadi160998_db_user:l7urTWvZ10EZnCJv@shopnaadicluster.kmplezt.mongodb.net/shopnaadi?appName=ShopNaadiCluster");
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // process.exit(1);
  }
};

module.exports = connectDB;