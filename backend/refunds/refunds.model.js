const { DataTypes } = require("sequelize");

module.exports = model

function model(sequelize){
    const attributes = {
        refund_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        return_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        payment_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        refund_amount:{
            type:DataTypes.STRING,
            allowNull:true
        },
        refund_status:{
            type:DataTypes.ENUM(
                'pending',
                'processed',
                'failed'
            ),
            defaultValue:"pending"
        }
    }

    return sequelize.define("refunds",attributes,{timestamps:true})
}