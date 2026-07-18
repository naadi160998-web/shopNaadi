const db = require("../_helper/db");
const { Op } = require("sequelize");

module.exports = {
    createStocks_Logs,
}

// create
async function createStocks_Logs(params) {
    try {
        const {movement_type,qty,notes,product_id,warehouse_id,stock_id} = await params;
        
        const stock_logs = {
            movement_type: movement_type,
            quantity: qty,
            notes:notes,
            stock_id:stock_id,
            warehouse_id:warehouse_id,
            product_id: product_id
        }

        console.log("***************stock_logs:",stock_logs);
        if(!stock_logs) return {completed: false, msg:"Values isn't found"}

        await db.Stock_Logs.create(stock_logs);

        return {msg:"stock_logs created successfully",status:201}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}