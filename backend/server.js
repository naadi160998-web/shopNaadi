const express = require("express");
const app = express();
// const fs = require("fs");
const cors = require("cors");
// const multer = require("multer")
// const path = require("path");
const cookieparser = require("cookie-parser")

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({exposedHeaders: ['Content-Disposition','Access-Control-Allow-Origin'],origin: "*"}));
app.use(cookieparser());
console.log("call server");
// api routes
app.use("/user",require("./users/users.controller"));
app.use("/product",require("./products/product.controller"))
app.use("/uploads",require("./imgUpload/productimgs.controller"));
app.use("/roles",require("./roles/role.controller"))
app.use("/customer",require("./customer/customer.controller"))
app.use("/vendor",require("./vendors/vendors.controller"))
app.use("/notification",require("./notification/notification.controller"))
app.use("/category",require("./Category/Category.controller"))

// temporary added
app.use("/userss",require("./SimpleProducts/SimpleProducts.controller"))
app.use("/uploads",express.static("uploads"))


app.listen(3000, () => {
    console.log("Server running port 3000");
})