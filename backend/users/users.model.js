const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        user_id:{
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        user_name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true
        },
        mobile:{
            type: DataTypes.STRING,
            allowNull: true
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true
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
    };

    return sequelize.define('users', attributes, {timestamps: false})
}