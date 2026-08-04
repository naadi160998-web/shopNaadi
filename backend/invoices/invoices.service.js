const db = require("../_helper/db")

module.exports={
    createInvoice,
    getAllInvoices
}

async function createInvoice(params) {
    try {
        const obj = await params;
        await db.Invoice.create(obj)
        return{msg:"created successfully",status:201}
    } catch (error) {
        console.log("error:",error);
        return error
    }
}

async function getAllInvoices() {
    try {
        const data = await db.Invoice.findAll();
        return {data,status:200}
    } catch (error) {
        console.log(error);
        
        return error
    }
}