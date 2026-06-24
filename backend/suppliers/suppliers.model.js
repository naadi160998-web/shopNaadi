const { DataTypes } = require("sequelize")

module.exports = model

function model(sequelize){
    const attributes = {
        suppliers_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        suppliers_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        contact_person:{
            type:DataTypes.STRING,
            allowNull:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:true
        },
        mobile:{
            type:DataTypes.STRING,
            allowNull:true
        },
        address:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        city:{
            type:DataTypes.STRING,
            allowNull:true
        },
        state:{
            type:DataTypes.STRING,
            allowNull:true
        },
        pincode:{
            type:DataTypes.STRING,
            allowNull:true
        },
        status:{
            type:DataTypes.ENUM(
                "active",
                "inactive"
            ),
            defaultValue:"active"
        }
    }
    return sequelize.define("Suppliers",attributes,{timestamps:true})
}