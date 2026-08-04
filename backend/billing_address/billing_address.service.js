const db = require("../_helper/db")

module.exports={
    createBilling,
    getAllBilling
}

async function createBilling(params) {
    try {
        const obj = await params;
        await db.Billing_Address.create(obj)
        return{msg:"created successfully",status:201}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}

async function getAllBilling() {
    try {
        const data = await db.Billing_Address.findAll();
        return {data,status:200}
    } catch (error) {
        console.log(error);
        
        return error
    }
}