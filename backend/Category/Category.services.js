const db = require('../_helper/db');

module.exports = {
    createCategory,
    getCategory
}

async function createCategory (params){
    try {
        await db.Categories.create(params);
        return "Created Successfully";
    } catch (error) {
        return error
    }
}

async function getCategory() {
    try {
        const data = await db.Categories.findAll()
        return data
    } catch (error) {
        
    }
}