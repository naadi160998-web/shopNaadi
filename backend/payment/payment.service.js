const db = require("../_helper/db")

module.exports={
    createPayment,
    getAllPayment
}

async function createPayment(params) {
    try {
        const obj = await params;
        await db.Payment.create(obj)
        return{msg:"created successfully",status:201}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}

async function getAllPayment() {
    try {
        const data = await db.Payment.findAll();
        return {data,status:200}
    } catch (error) {
        console.log(error);
        
        return error
    }
}