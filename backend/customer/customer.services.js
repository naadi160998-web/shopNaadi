require("dotenv")
const db = require("../_helper/db");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports = {
    getAllCustomers,
    addCustomers,
    login,
    updateUser,
    findById
}
// create
async function addCustomers(params) {
    try {
        const data =await params;
        if(data.length === 0) return "Data is Empty";

        // check email check
        const isEmailExits = await db.Customers.findAll({where:{customer_email:data.customer_email}})
        
        if(isEmailExits.length !== 0) return "Email is already exits";
        // username check
        const isNameExits = await db.Customers.findAll({where:{customer_name:data.customer_name}})
        if(isNameExits.length !== 0) return "This name is already exits"

        // hashpwd
        const salt = await bcript.genSalt(10);
        const hashPwd = await bcript.hash(data.customer_password,salt);
        data.customer_password = hashPwd;

        await db.Customers.create(data);
    
        // get created user
        const createdCustomer = await db.Customers.findOne({ where: { customer_email: data.customer_email } })
        // user Profile folder
        const dir = path.join("profiles/customerProfiles", JSON.stringify(createdCustomer.customer_id));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        return "Created Successfully"
    } catch (error) {
        return error
    }
}

// getAll Data
async function getAllCustomers() {
    try {
        const data = await db.Customers.findAll();
        return data
    } catch (error) {
        return error
    }
}

// login
async function login(params,id) {
    try {
        const {customer_email,customer_password} = await params;

        // emailCheck
        const isEmailExits = await db.Customers.findOne({where:{customer_email:customer_email}});
        if(isEmailExits.length === 0) return "Check your email";
        // pwd check
        const pwdCheck = await bcript.compare(customer_password,isEmailExits.customer_password);
        if(!pwdCheck) return "Check your password";
        const customerId = isEmailExits.customer_id
        const payLoad = {customerId}
        const secretCode = process.env.SCERET_CODE
        const token = jwt.sign(payLoad, secretCode, { expiresIn: "24h" });
        return {msg:"Login Successfully",token:token,data:isEmailExits}
    } catch (error) {
        return error
    }
}


async function findById(id) {
    try {
        const data = await db.Customers.findOne({where:{customer_id:id}})   
        return data
    } catch (error) {
        return error
    }
}

async function updateUser(data,id) {
    try {
        await db.Customers.update({profile_path:data.path,profile_img_name:data.filename},{where:{customer_id:id}})
        return "Updated Successfully"
    } catch (error) {
        return error
    }
}