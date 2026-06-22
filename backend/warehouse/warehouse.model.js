const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize){
    const attributes = {
        warehouse_id : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        warehouse_name:{
            type: DataTypes.STRING,
            allowNull:true
        },
        city:{
            type: DataTypes.STRING,
            allowNull:true
        }
    };

    return sequelize.define('warehouses',attributes,{timestamps: true})
}