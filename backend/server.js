require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./_helper/db");
const userRoutes = require("./users/users.controller");
const roleRoutes = require("./roles/role.controller");
const billingAddressRoutes = require("./billing_address/billing_address.controller");
const brandRoutes = require("./brand/brand.controller");
const cartRoutes = require("./cart/cart.controller");
const categoryRoutes = require("./Category/Category.controller");
const customerRoutes = require("./customer/customer.controller");
const deliveryRoutes = require("./deliveries/deliveries.controller");
const invoiceRoutes = require("./invoices/invoices.controller");
const ordersRoutes = require("./orders/orders.controller")
const orderitemsRoutes = require("./order_items/order_items.controller")
const paymentRoutes = require("./payment/payment.controller")
const productRoutes = require("./products/product.controller")
const productImgRoutes = require("./imgUpload/productimgs.controller")
const purchaseOrderRoutes = require("./purchase_orders/purchase_orders.controller")
const refundRoutes = require("./refunds/refunds.controller")
const returnProductRoutes = require("./return_product/return_product.controller")
const shipmentRoutes = require("./shipment/shipment.controller")
const stocklogRoutes = require("./stock_logs/stock_logs.controller")
const suppliersRoutes = require("./suppliers/suppliers.controller")
const vendorRoutes = require("./vendors/vendors.controller")
const warehouseRoutes = require("./warehouse/warehouse.controller")
const wishlistRoutes = require("./wishlist/wishlist.controller")
const offerRoutes = require("./offers/offer.controller")

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
app.use("/api/billingaddresses", billingAddressRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/orderitems", orderitemsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/product",productRoutes)
app.use("/api/productimgs",productImgRoutes)
app.use("/api/purchaseorder",purchaseOrderRoutes)
app.use("/api/refund",refundRoutes)
app.use("/api/returnProduct",returnProductRoutes)
app.use("/api/shipment",shipmentRoutes)
app.use("/api/stockLog",stocklogRoutes)
app.use("/api/suppliers",suppliersRoutes)
app.use("/api/vendors",vendorRoutes)
app.use("/api/warehouse",warehouseRoutes)
app.use("/api/wishlist",wishlistRoutes)
app.use("/api/offer",offerRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});