const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        return_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        order_items_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        status:{
            type:DataTypes.ENUM(
                "requested",
                "approved",
                "rejected",
                "completed"
            ),
            defaultValue:"requested"
        }
    }

    return sequelize.define("return_product",attributes,{timestamps:true})
}