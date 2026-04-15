const { DataTypes } = require("sequelize")

module.exports = model

function model(sequelize) {
    const attributes = {
        vendor_id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        vendor_name:{
            type:DataTypes.STRING,
            autoNull:true
        },
        vendor_email:{
            type:DataTypes.STRING,
            autoNull:true
        },
        vendor_password:{
            type:DataTypes.STRING,
            autoNull:true
        },
        vendor_address:{
            type:DataTypes.STRING,
            autoNull:true
        },
        vendor_mobile:{
            type:DataTypes.STRING,
            autoNull:true
        },
        vendor_company_name:{
            type:DataTypes.STRING,
            autoNull:true
        },
        profile_img_name:{
            type: DataTypes.STRING,
            allowNull:true
        },
        profile_path:{
            type: DataTypes.STRING,
            allowNull:true
        },
        role_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }

    return sequelize.define("vendors",attributes,{timestamps:true})
}