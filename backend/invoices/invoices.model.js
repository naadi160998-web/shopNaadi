const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize){
    const attributes = {
        invoice_id : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        customer_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        order_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        billing_address_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        invoice_number:{
            type: DataTypes.STRING,
            allowNull:true
        },
        invoice_date:{
            type: DataTypes.DATE,
            allowNull:true
        },
        due_date:{
            type: DataTypes.DATE,
            allowNull:true
        },
        invoice_status:{
            type:DataTypes.ENUM(
                "Paid",
                "Un Paid",
                "Partially Paid",
                "Cancelled",
                "Refunded"
            )
        },
        sub_total:{
            type: DataTypes.STRING,
            allowNull:true
        },
        discount_amount:{
            type: DataTypes.STRING,
            allowNull:true
        },
        tax_amount:{
            type: DataTypes.STRING,
            allowNull:true
        },
        shipping_charges:{
            type: DataTypes.STRING,
            allowNull:true
        },
        total_amount:{
            type: DataTypes.STRING,
            allowNull:true
        },
        paid_amount:{
            type: DataTypes.STRING,
            allowNull:true
        },
        notes:{
            type: DataTypes.TEXT,
            allowNull:true
        },
    };

    return sequelize.define('invoice',attributes,{timestamps: true})
}