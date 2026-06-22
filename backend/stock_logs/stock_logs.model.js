const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        stock_logs_id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        stock_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        warehouse_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        movement_type:{
            type: DataTypes.ENUM(
                "stock_in",
                "stock_out",
                "return",
                "adjustment"
            ),
            allowNull:true
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        notes:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    };

    return sequelize.define('stock_logs',attributes,{timestamps: true})
}