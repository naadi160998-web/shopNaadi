const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        stock_id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        warehouse_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        price:{
            type: DataTypes.STRING,
            allowNull:true
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
    };

    return sequelize.define('stocks',attributes,{timestamps: true})
}