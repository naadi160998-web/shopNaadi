const { DataTypes } = require("sequelize")

module.exports = model

async function model(sequelize) {
    const attributes = {
        notification_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        user_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        requests:{
            type:DataTypes.STRING,
            allowNull:true
        }
    }
    return sequelize.define("notification",attributes,{timestamps:true})
}