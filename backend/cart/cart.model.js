const { DataTypes } = require("sequelize")

module.exports = model

function model(sequelize) {
    const attrubutes = {
        cart_id:{
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
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:1
        }
    }

    return sequelize.define("cart",attrubutes,{timestamps:true})
}