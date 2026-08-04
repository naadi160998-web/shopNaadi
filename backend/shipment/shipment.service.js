const db = require("../_helper/db")

module.exports={
    createShipment,
    getAllShipment
}

async function createShipment(params) {
    try {
        const obj = await params;
        await db.Shipment.create(obj)
        return{msg:"created successfully",status:201}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}

async function getAllShipment() {
    try {
        const data = await db.Shipment.findAll();
        return {data,status:200}
    } catch (error) {
        console.log(error);
        
        return error
    }
}