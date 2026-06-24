const { DataTypes } = require("sequelize")

module.exports = model

function model(sequelize) {
    const attributes = {
        payment_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        order_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        payment_method:{
            type:DataTypes.ENUM(
                "COD",
                "UPI",
                "CARD",
                "NETBANKING"
            )
        },
        payment_status:{
            type:DataTypes.ENUM(
                "pending",
                "success",
                "failed",
                "refunded"
            ),
            defaultValue:"pending"
        },
        transaction_id:{
            type:DataTypes.STRING,
            allowNull:true
        }
    }
    return sequelize.define("payment",attributes,{timestamps:true})
}