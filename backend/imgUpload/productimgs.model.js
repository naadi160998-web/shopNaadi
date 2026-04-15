const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        product_img_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        product_img_src:{
            type:DataTypes.STRING,
            allowNull:true
        },
        vendor_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        product_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        category_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
    }

    return sequelize.define("productimgsrc",attributes,{timestamps:false})
}