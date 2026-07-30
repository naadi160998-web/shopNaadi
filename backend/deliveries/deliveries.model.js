const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize){
    const attributes = {
        delivery_id : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        shipment_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        order_id:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        delivered_to:{
            type: DataTypes.STRING,
            allowNull:true
        },
        receivered_phone:{
            type: DataTypes.STRING,
            allowNull:true
        },
        receivered_phone:{
            type: DataTypes.STRING,
            allowNull:true
        },
        received_by:{
            type: DataTypes.STRING,
            allowNull:true
        },
        delivery_status:{
            type:DataTypes.ENUM(
                "pending",
                "out_of_delivery",
                "delivered",
                "failed",
                "returned"
            )
        },
        proof_of_delivery_url:{
            type: DataTypes.STRING,
            allowNull:true
        },
        otp_verified:{
            type: DataTypes.BOOLEAN,
            allowNull:true
        },
        delivery_otp:{
            type: DataTypes.STRING,
            allowNull:true
        },
        delivery_at:{
            type: DataTypes.DATE,
            allowNull:true
        },
        failed_reason:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        remarks:{
            type: DataTypes.TEXT,
            allowNull:true
        },
    };

    return sequelize.define('deliveries',attributes,{timestamps: true})
}