const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        brand_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        brand_name:{
            type:DataTypes.STRING,
            autoNull:true
        }
    }

    return sequelize.define("brands",attributes,{timestamps:true})
}













// const { DataTypes } = require("sequelize")

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         brand_id:{
//             type:DataTypes.INTEGER,
//             autoIncrement:true,
//             primaryKey:true
//         },
//         brand_name:{
//             type:DataTypes.STRING,
//             allowNull:true
//         }
//     }
//     sequelize.define("brand",attributes,{timestamps:true})
// }