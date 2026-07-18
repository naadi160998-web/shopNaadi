const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        order_items_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        order_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        product_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        warehouse_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        price:{
            type:DataTypes.STRING,
            allowNull:true
        },
        subTotal:{
            type:DataTypes.STRING,
            allowNull:true
        }
    }

    return sequelize.define("Order_Items",attributes,{timestamps:true})
}