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
        customer_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        payment_reference:{
            type:DataTypes.STRING,
            allowNull:true
        },
        // transaction_id:{
        //     type:DataTypes.STRING,
        //     allowNull:true
        // },
        payment_method:{
            type:DataTypes.ENUM(
                "COD",
                "UPI",
                "CARD",
                "NETBANKING"
            )
        },
        payment_gateway:{
            type:DataTypes.ENUM(
                "Razorpay,",
                "Stripe",
                "Paypal"
            )
        },
        payment_status:{
            type:DataTypes.ENUM(
                "pending",
                "success",
                "failed",
                "refunded",
                "paid failed"
            ),
            defaultValue:"pending"
        },
        currency:{
            type:DataTypes.STRING,
            allowNull:true
        },
        amt_desc:{
            type:DataTypes.STRING,
            allowNull:true
        },
        gateway_fee:{
            type:DataTypes.STRING,
            allowNull:true
        },
        tax_amt:{
            type:DataTypes.STRING,
            allowNull:true
        },
        refund_amt:{
            type:DataTypes.STRING,
            allowNull:true
        },
        payment_date:{
            type:DataTypes.STRING,
            allowNull:true
        },
        notes:{
            type:DataTypes.TEXT,
            allowNull:true
        },
    }
    return sequelize.define("payment",attributes,{timestamps:true})
}