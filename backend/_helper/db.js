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
    db.Notification = require("../notification/notification.model")(sequelize);
    db.Categories = require("../Category/Category.model")(sequelize);
    // temporary added
    db.SimpleProducts = require("../SimpleProducts/SimpleProducts.model")(sequelize)

    // products relations
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
    
    // sync all models with database
    await sequelize.sync({alter: false});
}