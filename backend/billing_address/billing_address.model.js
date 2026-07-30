const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize){
    const attributes = {
        billing_address_id : {
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
        company_name:{
            type: DataTypes.STRING,
            allowNull:true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:true
        },
        phone:{
            type: DataTypes.STRING,
            allowNull:true
        },
        address:{
            type: DataTypes.STRING,
            allowNull:true
        },
        city:{
            type: DataTypes.STRING,
            allowNull:true
        },
        state:{
            type: DataTypes.STRING,
            allowNull:true
        },
        country:{
            type: DataTypes.STRING,
            allowNull:true
        },
        postal_code:{
            type: DataTypes.STRING,
            allowNull:true
        },
        gst_number:{
            type: DataTypes.STRING,
            allowNull:true
        },
        address_type:{
            type: DataTypes.STRING,
            allowNull:true
        },
    };

    return sequelize.define('billingaddress',attributes,{timestamps: true})
}