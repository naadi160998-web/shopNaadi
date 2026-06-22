const db = require("../_helper/db");
const { Op } = require("sequelize");

module.exports = {
    createWarehouses,
    updateWarehouses,
    deleteWarehouses,
    getAllWarehouses,
    findById
}

// create
async function createWarehouses(params) {
    try {
        const {warehouse_name,city,product_id} = await params;
        
        const warehouses = {
            warehouse_name: warehouse_name,
            city: city,
            product_id: product_id
        }

        console.log("***************warehouses:",warehouses);
        if(!warehouses) return {completed: false, msg:"Values isn't found"}

        await db.Warehouses.create(warehouses);

        return {msg:"warehouse created successfully"}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}
async function findById(id) {
    try {
        const warehouseid = await id;
        const warehouses = await db.Warehouses.findOne({where:{warehouse_id:warehouseid}})
        return warehouses
    } catch (error) {
        console.log("error:",error);
    }
}

// getAllData
async function getAllWarehouses() {
    try {
        const warehouses = await db.Warehouses.findAll();
        if(warehouses === undefined) throw new Error("Warehouses not found");
        
        console.log("Get warehouses:",warehouses)
        return warehouses;
        
    } catch (error) {
        console.log("error:",error);
        
    }
}

// updateWarehouses
async function updateWarehouses(warehouse,warehouse_id) {
    try {
        const items = await warehouse;
        await db.Warehouses.update(items,{where:{warehouse_id:warehouse_id}})
        return {data: items,msg:"Warehouse updated successfully"}
    } catch (error) {
        return {data: error,msg:"Failed to update warehouse"}
    }
}

// deleteWarehouses
async function deleteWarehouses(warehouse_id) {
    try {
        // console.log("call  it");
        await db.Warehouses.destroy({where:{warehouse_id:Number(warehouse_id)}})
        return {completed:true}
    } catch (error) {
        return {completed:false}
    }
}