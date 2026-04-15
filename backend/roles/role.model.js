const { DataTypes } = require("sequelize")

module.exports = model;

function model(sequelize) {
    const attributes = {
        role_id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        role:{
            type: DataTypes.STRING,
            allowNull:true
        }
    };

    return sequelize.define("role",attributes,{timestamps: false})
}