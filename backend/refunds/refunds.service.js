const db = require("../_helper/db")
const { Op } = require("sequelize")

module.exports = {
    createRefunds
}

async function createRefunds(params) {
    try {
        const {
            return_id,
            payment_id,
            refund_amount,
            refund_status,
        } = params

        const refunds = {
            return_id:return_id,
            payment_id:payment_id,
            refund_amount:refund_amount,
            refund_status:refund_status,
        }

        console.log("*************refunds:",refunds);
        if(!refunds) return "Value not come!!!"
        await db.Refunds.create(refunds)
        return {msg:"created successfully"}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}