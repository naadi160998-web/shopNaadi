const db = require("../_helper/db");

module.exports = {
    createNotification
}

async function createNotification(params) {
    try {
        const notifi = await params;
        await db.Notification.create(notifi);
        return {msg:"Created Successfully!"}
    } catch (error) {
        return error        
    }
}