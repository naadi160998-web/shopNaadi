const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        product_id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        product_name:{
            type: DataTypes.STRING,
            allowNull:true
        },
        product_desc:{
            type: DataTypes.STRING,
            allowNull:true
        },
        old_price:{
            type: DataTypes.STRING,
            allowNull:true
        },
        new_price:{
            type: DataTypes.STRING,
            allowNull:true
        },
        product_gender:{
            type: DataTypes.STRING,
            allowNull:true
        },
        product_dealer:{
            type: DataTypes.STRING,
            allowNull:true
        },
        product_discount:{
            type: DataTypes.STRING,
            allowNull:true
        },
        product_size:{
            type: DataTypes.STRING,
            allowNull:true
        },
        product_color:{
            type:DataTypes.STRING,
            allowNull:true
        },
        product_stock:{
            type:DataTypes.STRING,
            allowNull:true
        },
        product_type:{
            type: DataTypes.STRING,
            allowNull:true
        },
        vendor_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        category_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        }
    };

    return sequelize.define('products',attributes,{timestamps: true})
}