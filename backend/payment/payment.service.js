const db = require("../_helper/db")
const { Op } = require("sequelize")

module.exports = {
    createPayment
}

async function createPayment(params) {
    try {
        const {
            order_id,
            payment_method,
            payment_status,
            transaction_id
        } = await params

        const payment = {
            order_id:order_id,
            payment_method:payment_method,
            payment_status:payment_status,
            transaction_id:transaction_id
        }

        console.log("************payment:",payment);
        if(!payment) return "Value not come!!!"

        await db.Payment.create(payment)
        return "create successfully"
    } catch (error) {
        console.log(":< = ",error);
        return error
    }
}