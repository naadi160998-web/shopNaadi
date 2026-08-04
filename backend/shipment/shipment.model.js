const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize){
    const attributes = {
        shipment_id : {
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
        invoice_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        warehouse_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        courier_name:{
            type: DataTypes.STRING,
            allowNull:true
        },
        tracking_number:{
            type: DataTypes.STRING,
            allowNull:true
        },
        shipping_method:{
            type:DataTypes.ENUM(
                "standard",
                "express",
                "same_day",
                "pick_up",
                "Refunded"
            )
        },
        shipping_status:{
            type:DataTypes.ENUM(
                "pending",
                "packed",
                "dispatched",
                "in_transit",
                "out_of_delivery",
                "delivered",
                "returned",
                "cancelled"
            )
        },
        estimated_delivery:{
            type: DataTypes.STRING,
            allowNull:true
        },
        dispatched_at:{
            type: DataTypes.STRING,
            allowNull:true
        },
        shipped_at:{
            type: DataTypes.STRING,
            allowNull:true
        },
        notes:{
            type: DataTypes.TEXT,
            allowNull:true
        },
    };

    return sequelize.define('shipment',attributes,{timestamps: true})
}