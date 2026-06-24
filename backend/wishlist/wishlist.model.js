const { DataTypes } = require("sequelize")

module.exports = model

function model(sequelize) {
    const attributes = {
        wishlist_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        customer_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        product_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
    }

    return sequelize.define("wishlists",attributes,{timestamps:true})
}