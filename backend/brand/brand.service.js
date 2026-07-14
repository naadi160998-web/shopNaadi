const db = require('../_helper/db');

module.exports = {
    createBrands,
    getAllBrands,
    updateBrands,
    deleteBrands
}

async function createBrands (params){
    try {
        await db.Brands.create(params);
        return {
            data:"Created successfully",
            status:201
        };
    } catch (error) {
        return error
    }
}


async function getAllBrands(params){
    try {
        const data = await db.Brands.findAll(params);
        // console.log("***********brands:",data);
        
        return {
            data:data,
            status:200
        };
    } catch (error) {
        return error
    }
}

// updateBrands
async function updateBrands(brand,brand_id) {
    try {
        const items = await brand;
        await db.Brands.update(items,{where:{brand_id:brand_id}})
        return {data: items,msg:"brand updated successfully",status:200}
    } catch (error) {
        return {data: error,msg:"Failed to update brand"}
    }
}

// deleteBrands
async function deleteBrands(brand_id) {
    try {
        // console.log("call  it");
        await db.Brands.destroy({where:{brand_id:Number(brand_id)}})
        return {data:"Deleted",status:200}
    } catch (error) {
        return {completed:false}
    }
}