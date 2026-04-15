const db = require("../_helper/db");
const fs = require("fs")
const path = require("path")
const { Op } = require("sequelize")

module.exports = {
    uploadProductImgs,
    deleteImgPath,
    getImgData,
    updateProductImgs
}

async function uploadProductImgs(files, vendor_id, product_id,category_id,img_categories) {
    try {
        const imageRecords = files.map(file => ({
            product_img_src: file,
            vendor_id: Number(vendor_id),
            product_id: Number(product_id),
            category_id:Number(category_id)
        }));

        await db.ProductImgSrc.findAll({
            where: {
                vendor_id: Number(vendor_id),
                product_id: Number(product_id),
                category_id: Number(category_id)
            }
        }).then(async existingRecords => {
            const existingPaths = existingRecords.map(record => record.product_img_src);
            const newRecords = imageRecords.filter(record => !existingPaths.includes(record.product_img_src));
            await db.ProductImgSrc.bulkCreate(newRecords);
        });

        // getImageData
        const imgData = await getImgData(vendor_id,product_id,category_id)

        return { msg: "Created Successfully",data:imgData};
    } catch (error) {
        console.error(error);
        return { msg: "Error while uploading images", error };
    }
}

async function updateProductImgs(files, vendor_id, product_id,product_img_id) {
    try {
        // const imageRecords = files.map(file => ({
        //     product_img_src: file,
        //     vendor_id: Number(vendor_id),
        //     product_id: Number(product_id),
        //     product_img_id: Number(product_img_id)
        // }));

        console.log("**********imageRecords:",files);
        
        await db.ProductImgSrc.update(
            { product_img_src: files },
            {
                where: {
                    product_img_id: Number(product_img_id),
                    vendor_id: Number(vendor_id),
                    product_id: Number(product_id),

                }
            }
        );
        return { msg: "Updated Successfully" };
    } catch (error) {
        console.error(error);
        return { msg: "Error while uploading images", error };
    }
}

async function getImgData(vendor_id,product_id,category_id) {
    try {
        const imgData = await db.ProductImgSrc.findAll({
            where: {
                vendor_id: Number(vendor_id),
                product_id: Number(product_id),
                category_id: Number(category_id)
            }
        });
        return imgData;
    } catch (error) {
        throw new Error("Error fetching image data");
    }
}

async function deleteImgPath(params) {
    try {
        const { product_img_id, imagePath, product_id, vendor_id } = await params
        // console.log("deleteImgPath params:", {product_img_id,vendor_id,product_id,imagePath});
        await db.ProductImgSrc.destroy({where:{
            product_img_id:product_img_id,
            vendor_id:vendor_id,
            product_id:product_id
        }})
        return {msg:"Deleted Successfully"}
    } catch (error) {
        return {msg:error}
    }
}