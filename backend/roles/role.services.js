const db = require("../_helper/db")

module.exports = {
    createRole,
    getRoles,
    updateRole,
    removeRole
}

// create
async function createRole(params) {
    try {
        const roles = await params;
        await db.Role.create(roles)
        return {completed:true}
    } catch (error) {
        return {completed:false}
    }
}

// getRoles
async function getRoles(params) {
    try {
        // console.log("***************************************");
        
        const data = await db.Role.findAll()
        // console.log("data:",data);
        
        return {
            completed:true,
            data:data
        }
    } catch (error) {
        return {completed:false}
    }
}

// update roles
async function updateRole(params,id) {
    try {
        const res = await params;
        await db.Role.update(res,{where:{roleid:id}})
        return {completed:true}
    } catch (error) {
        return {completed:false}
    }
}

// delete roles
async function removeRole(params) {
    try {
        const id = await params;
        await db.Role.destroy({where:{roleid:id}})
        return {completed:true}
    } catch (error) {
        return {completed:false}
    }
}