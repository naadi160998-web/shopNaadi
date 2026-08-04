const db = require("../_helper/db")

module.exports={
    createdelivery,
    getAllDelivery
}

async function createdelivery(params) {
    try {
        const obj = await params;
        await db.Deliveries.create(obj)
        return{msg:"created successfully",status:201}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}

async function getAllDelivery() {
    try {
        const data = await db.Deliveries.findAll();
        return {data,status:200}
    } catch (error) {
        console.log(error);
        
        return error
    }
}