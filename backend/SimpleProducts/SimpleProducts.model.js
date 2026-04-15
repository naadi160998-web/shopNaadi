const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:true
        }
    };

    return sequelize.define('simpleproducts',attributes,{timestamps: true})
}