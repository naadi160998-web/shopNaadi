const config = require('../config.json');
const mysql = require("mysql2/promise");
const { Sequelize, Op } = require('sequelize');

module.exports = db = {};
initialize();
async function initialize() {
    console.log("INSIDE DB")
    // create db if it doesn't already exist
    const { host,port,user,password,database } = config.database;
    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password
    })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database,user,password, { dialect: 'mysql' });

    db.sqlz = sequelize;
    db.op = Op;
    db.Users = require("../users/users.model")(sequelize);
    db.Products = require("../products/product.model")(sequelize);
    db.ProductImgSrc = require("../imgUpload/productimgs.model")(sequelize);
    db.Role = require("../roles/role.model")(sequelize);
    db.Customers = require("../customer/customer.model")(sequelize);
    db.Vendors = require("../vendors/vendors.model")(sequelize);
    // db.Notification = require("../notification/notification.model")(sequelize);
    db.Categories = require("../Category/Category.model")(sequelize);
    db.Stocks = require("../stocks/stocks.model")(sequelize);
    db.Warehouses = require("../warehouse/warehouse.model")(sequelize);
    db.Stock_Logs = require("../stock_logs/stock_logs.model")(sequelize);
    db.Orders = require("../orders/orders.model")(sequelize);
    db.OrderItems = require("../order_items/order_items.model")(sequelize);
    db.Suppliers = require("../suppliers/suppliers.model")(sequelize)
    db.Purchase_Orders = require("../purchase_orders/purchase_orders.model")(sequelize)

    // products relations
    db.Products.belongsTo(db.Suppliers,{foreignKey: 'supplier_id', as: 'suppliers'})
    db.Products.belongsTo(db.Vendors,{foreignKey: 'vendor_id', as: 'user'})
    db.Products.belongsTo(db.Categories,{foreignKey: 'category_id', as: 'categories'})
    
    // produtcImgSrc
    db.ProductImgSrc.belongsTo(db.Vendors,{foreignKey: 'vendor_id',as: 'vendor'})
    db.ProductImgSrc.belongsTo(db.Products,{foreignKey: 'product_id',as: 'product'})
    db.ProductImgSrc.belongsTo(db.Categories,{foreignKey: 'category_id',as: 'category'})
    db.Products.hasMany(db.ProductImgSrc,{foreignKey: 'product_id',as: 'productimgs'})
    // user
    db.Users.belongsTo(db.Role,{foreignKey: 'role_id',as:"role"})
    
    // Vendor
    db.Vendors.belongsTo(db.Role,{foreignKey: 'role_id',as:"role"})

    // stock
    db.Stocks.belongsTo(db.Products,{foreignKey: 'product_id', as: 'stock_products'})
    db.Stocks.belongsTo(db.Warehouses,{foreignKey: 'warehouse_id', as: 'stock_warehouses'})

    // stock_logs
    db.Stock_Logs.belongsTo(db.Stocks,{foreignKey: 'stock_id', as: 'stock_logs_stock_id'})
    db.Stock_Logs.belongsTo(db.Products,{foreignKey: 'product_id', as: 'stock_logs_products'})
    db.Stock_Logs.belongsTo(db.Warehouses,{foreignKey: 'warehouse_id', as: 'stock_logs_warehouses'})

    // warehouses
    db.Warehouses.belongsTo(db.Products,{foreignKey: 'product_id', as: 'warehouses_products'})

    // order_items
    db.OrderItems.belongsTo(db.Orders,{foreignKey: 'order_id', as: 'order_items_order'})
    db.OrderItems.belongsTo(db.Products,{foreignKey: 'product_id', as: 'order_items_products'})

    // Purchase_Orders
    db.Purchase_Orders.belongsTo(db.Suppliers,{foreignKey: 'supplier_id', as: 'suppliers_Purchase_Orders'})
    db.Purchase_Orders.belongsTo(db.Warehouses,{foreignKey: 'warehouse_id', as: 'purchase_orders_warehouses'})

    // sync all models with database
    await sequelize.sync({alter: false});
}