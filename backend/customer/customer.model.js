const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        customer_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        customer_name:{
            type:DataTypes.STRING,
            autoNull:true
        },
        customer_email:{
            type:DataTypes.STRING,
            autoNull:true
        },
        customer_password:{
            type:DataTypes.STRING,
            autoNull:true
        },
        customer_address:{
            type:DataTypes.STRING,
            autoNull:true
        },
        customer_mobile:{
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
    }

    return sequelize.define("customers",attributes,{timestamps:true})
}