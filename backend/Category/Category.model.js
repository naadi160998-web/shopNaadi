const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        category_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        category_name:{
            type:DataTypes.STRING,
            autoNull:true
        }
    }

    return sequelize.define("categories",attributes,{timestamps:true})
}