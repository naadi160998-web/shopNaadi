const { DataTypes, UniqueConstraintError } = require("sequelize");

module.exports = model;

function model(sequelize){
    const attributes = {
        order_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        order_number:{
            type:DataTypes.STRING,
            allowNull:true,
            unique:true
        },
        customer_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        date:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        total_amount:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        status:{
            type:DataTypes.ENUM(
                "Pending",
                "Confirmed",
                "Packed",
                "Shipped",
                "Delivered",
                "Cancelled"
            ),
            defaultValue:"Pending"
        }
    }

    return sequelize.define("orders",attributes,{timestamps:true})
}