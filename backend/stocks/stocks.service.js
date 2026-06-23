const db = require("../_helper/db");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

module.exports = {
    createStocks,
    updateStocks,
    deleteStocks,
    getAllStocks,
    findById,
    getStocks
}

// create
async function createStocks(params) {
    try {
        const {price,quantity,product_id,warehouse_id} = await params;
        
        const stock = {
            price: price,
            quantity: quantity,
            warehouse_id:warehouse_id,
            product_id: product_id
        }

        console.log("***************stock:",stock);
        if(!stock) return {completed: false, msg:"Values isn't found"}

        await db.Stocks.create(stock);

        return {msg:"stock created successfully"}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}
async function findById(id) {
    try {
        const stockid = await id;
        const stock = await db.Stocks.findOne({where:{stock_id:stockid}})
        return stock
    } catch (error) {
        console.log("error:",error);
    }
}

// getAllData
async function getAllStocks() {
    try {
        const stocks = await db.Stocks.findAll();
        if(stocks === undefined) throw new Error("stocks not found");
        
        console.log("Get stocks:",stocks)
        return stocks;
        
    } catch (error) {
        console.log("error:",error);
        
    }
}

// updateStocks
async function updateStocks(stocks,stock_id) {
    try {
        const items = await stocks;
        const quantity = Number(items.quantity)
        const stock = await db.Stocks.findOne({where:{stock_id:stock_id}})
        console.log("***************stock:",stock);
        if(!stock) return {data: null,msg:"stock_id not found"}
        items.quantity = stock.quantity + quantity
        await db.Stocks.update(items,{where:{stock_id:stock_id}})
        return {data: items,msg:"stock_id updated successfully"}
    } catch (error) {
        return {data: error,msg:"Failed to update stock_id"}
    }
}

// deleteStocks
async function deleteStocks(stock_id) {
    try {
        // console.log("call  it");
        await db.Stocks.destroy({where:{stock_id:Number(stock_id)}})
        return {completed:true}
    } catch (error) {
        return {completed:false}
    }
}

async function getStocks() {
    try {
        // const query = "SELECT s.stock_id, p.product_name,w.warehouse_name,s.quantity FROM stocks s INNER JOIN products p ON s.product_id = p.product_id INNER JOIN warehouses w ON s.warehouse_id = w.warehouse_id";
        const stocks = await db.sequelize.query("SELECT s.stock_id, p.product_name,w.warehouse_name,s.quantity FROM stocks s INNER JOIN products p ON s.product_id = p.product_id INNER JOIN warehouses w ON s.warehouse_id = w.warehouse_id", { type: QueryTypes.SELECT });
        return stocks;
    } catch (error) {
        console.error("Error fetching stocks:", error);
        throw new Error("Failed to fetch stocks");
    }
}