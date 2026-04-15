require("dotenv").config();
const db = require("../_helper/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const fs = require("fs");
const path = require("path");

module.exports = {
    createUser,
    login,
    getAll,
    updateUser,
    removeUser,
    findById
}

async function createUser(params) {
    try {
        if(!params){
            return {completed: "something went wrong"}
        }
        const user = await params;
        
        // isEmailExits
        const isEmailExits = await db.Users.findAll({ where: { email: user.email } })
        // isUserName
        const isUserName = await db.Users.findAll({ where: { user_name: user.user_name } });

        if (isEmailExits.length > 0) return "Email already exists"
        if (isUserName.length > 0) return "UserName already exists"

        // hasing pwd
        const salt =await bcrypt.genSalt(10)
        const hassingPwd = await bcrypt.hash(user.password,salt);
        user.password = hassingPwd
        
        await db.Users.create(user)
        
        // get created user
        const createdUser = await db.Users.findOne({ where: { email: user.email } })
        // user Profile folder
        
        const dir = path.join("profiles/userProfiles", JSON.stringify(createdUser.user_id));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        return "Created Successfully"
    } catch (error) {
        return { completed:false}
    }
}

// login
async function login(params) {
    try {
        const {email,password} = await params;

        // email exits
        const isExitsUser = await db.Users.findOne({where:{email:email}})
        if(isExitsUser.length === 0) return "Check your email";
        // match pwd
        const matchPwd = await bcrypt.compare(password,isExitsUser.password)
        if(!matchPwd) return "Check your password" 

        const payLoad = {userId:isExitsUser.user_id}
        const secretCode = process.env.SCERET_CODE;
        const token = jwt.sign(payLoad,secretCode,{expiresIn:'24h'})
        
        return {msg:"Login Successfully",token:token,data:isExitsUser}
        // console.log("isExitsUser:",isExitsUser)
    } catch (error) {
        console.log("error:",error);
        return error
    }
}

// getAll
async function getAll() {
    try {
        const items = await db.Users.findAll();
        return {completed:true, data:items}
    } catch (error) {
        return {completed:false}
    }
}

async function updateUser(params,id) {
    try {
        const res = await params;
        console.log("res:",res);
        let check = res.fieldname === "image" ? true : false;
        
        if(!check){
            await db.Users.update(res,{where:{user_id:id}})
            let data = await db.Users.findOne({where:{user_id:id}})
            return data
        }else{
            await db.Users.update({profile_path:params.path,profile_img_name:params.filename},{where:{user_id:id}})
            let data = await db.Users.findOne({where:{user_id:id}})
            return data
        }
    } catch (error) {
        return {completed:false}
    }
}

async function removeUser(id) {
    try {
        const userId = await id
        await db.Users.destroy({where:{user_id:userId}})
        const folderPath = path.join(
            process.cwd(),
            "profiles/userProfiles",
            id
        );

        if (fs.existsSync(folderPath)) {
            fs.rmSync(folderPath, { recursive: true, force: true });
        }
        return {completed:true}
    } catch (error) {
        return {completed:false}
    }
}

async function findById(id) {
    try {
        const data = await db.Users.findOne({where:{user_id:id}})   
        return data
    } catch (error) {
        return error
    }
}