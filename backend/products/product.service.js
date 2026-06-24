const db = require("../_helper/db");
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const { Op } = require("sequelize");

module.exports = {
    createProducts,
    getProductUserId,
    updateProducts,
    deleteProducts,
    getAllProducts,
    uploadProductImgs,
    findById
}
async function uploadProductImgs(params) {
    try {
        
    } catch (error) {
        return error
    }
}
// create
async function createProducts(params) {
    try {
        const {product_name,product_desc,product_stock,old_price,product_dealer,product_discount,product_size,new_price,product_type,product_gender,product_color,supplier_id,vendor_id,category_id} = await params;
        
        const product = {
            product_name: product_name,
            product_desc: product_desc,
            product_stock: product_stock,
            old_price: old_price,
            product_dealer: product_dealer,
            product_discount: product_discount,
            product_size: product_size,
            new_price: new_price,
            product_type: product_type,
            product_gender: product_gender,
            product_color: product_color,
            supplier_id:supplier_id,
            vendor_id: vendor_id,
            category_id:category_id
        }

        console.log("***************products:",product);
        if(!product) return {completed: false, msg:"Values isn't found"}

        // folder create
        const folder = `productImgs/${product.vendor_id}`
        const newFolders = `${product.product_type}/${product.product_gender}`
        const dir = path.join(folder, newFolders);
        if (!fs.existsSync(dir) ) {
            fs.mkdirSync(dir, { recursive: true });
        }
        await db.Products.create(product);

        const thatProduct = await db.Products.findOne({where:{product_name:product.product_name}})
        
        // after productif folder create
        const productidDir = path.join(dir, JSON.stringify(thatProduct.product_id));
        if (!fs.existsSync(productidDir) ) {
            fs.mkdirSync(productidDir, { recursive: true });
        }
        return {msg:"Product created successfully",data:thatProduct}
    } catch (error) {
        console.log("error:",error);
        
        return "Something went wrong"
    }
}

// getProductUserId
async function getProductUserId(params) {
    try {
        const userId = await params;
        // console.log("111111111111111userId:",userId);
        
        // const products = await db.Products.findAll({where: {vendor_id: parseInt(userId)}});
        const products = await db.Products.findAll({
            where: {vendor_id: userId},
            include:[{
                model: db.ProductImgSrc,
                as: "productimgs",
                attributes: ["product_img_id","product_img_src","vendor_id","product_id","category_id"]
            }]
        });
        // console.log("2222222222222222222222222products:",JSON.stringify(products));
        
        if(products === undefined) throw new Error("Products not found");
        
        // console.log("Get products:",products)
        return products;
        
    } catch (error) {
        console.log("error:",error);
        
    }
}

async function findById(id) {
    try {
        const productid = await id;
        const products = await db.Products.findOne({where:{product_id:productid}})
        return products
    } catch (error) {
        console.log("error:",error);
    }
}

// getAllData
async function getAllProducts() {
    try {
        const products = await db.Products.findAll();
        if(products === undefined) throw new Error("Products not found");
        
        // console.log("Get products:",products)
        return products;
        
    } catch (error) {
        console.log("error:",error);
        
    }
}

// updateProducts
async function updateProducts(product,product_id) {
    try {
        const items = await product;
        const vendor_id = items.vendor_id;
        await db.Products.update(items,{where:{product_id:product_id,vendor_id:vendor_id}})
        return {data: items,msg:"Product updated successfully"}
    } catch (error) {
        return {data: error,msg:"Failed to update product"}
    }
}

// deleteproducts
async function deleteProducts(product_id,vendor_id,obj) {
    try {
        // console.log("call  it");
        await db.Products.destroy({where:{product_id:Number(product_id),vendor_id:Number(vendor_id)}})
        // console.log("obj:",obj);
        
        // Get image records
        const images = await db.ProductImgSrc.findAll({
            where: {
                product_img_id: {
                    [Op.in]: obj.imgIds,
                },
            },
        });
        // console.log("Found images:", images);
        if (!images.length) {
            return res.status(404).json({
                success: false,
                message: "Images not found",
            });
        }
        
        // Delete physical files
        for (const img of images) {
            
            const filePath = path.join(
                img.product_img_src
            );

            // console.log("filePath:",filePath);
            
            // console.log("fs.existsSync(filePath):",fs.existsSync(filePath));
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const imgIds = obj.imgIds
        
        await db.ProductImgSrc.destroy({
            where: {
                product_img_id: {
                    [Op.in]:imgIds
                }
            }
        })

        const folderPaths = path.join(
            process.cwd(),
            "uploads",
            "products",
            vendor_id,
            product_id
        );
        // console.log("*****************folder path:", folderPaths);
        const path1 = folderPaths.split("\\").join("/");
        // console.log("path:", path1);
        fs.rmSync(folderPaths, {
            recursive: true,
            force: true,
        });
        return {completed:true}
    } catch (error) {
        return {completed:false}
    }
}