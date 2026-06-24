const db = require("../_helper/db");
const { Op } = require("sequelize")

module.exports = {
    createSuppliers
}

async function createSuppliers(params) {
    try {
        const {
            suppliers_name,
            contact_person,
            email,
            mobile,
            address,
            city,
            state,
            pincode,
            status
        } = await params

        const suppliers = {
            suppliers_name:suppliers_name,
            contact_person:contact_person,
            email:email,
            mobile:mobile,
            address:address,
            city:city,
            state:state,
            pincode:pincode,
            status:status
        }
        console.log("*********suppliers:",suppliers);
        if(!suppliers) return "Values not here!"

        await db.Suppliers.create(suppliers)
        return {msg:"Created Success"}

    } catch (error) {
        console.loh(":<",error)
        return error
    }
}