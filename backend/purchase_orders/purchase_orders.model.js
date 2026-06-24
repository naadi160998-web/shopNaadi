const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        purchase_orders_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        suppliers_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        warehouse_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        order_date:{
            type:DataTypes.STRING,
            allowNull:true
        },
        status:{
            type:DataTypes.ENUM(
                "pending",
                "received",
                "cancelled"
            ),
            defaultValue:"pending"
        }
    }

    return sequelize.define("purchase_order",attributes,{timestamps:true})
}