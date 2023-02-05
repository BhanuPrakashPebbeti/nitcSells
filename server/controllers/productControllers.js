const db = require('../config/db');
const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
    req.productId = id;
    next();
}

const mime = require("mime-types");
const { Readable } = require("stream");

const fs = require('fs');
const { google } = require('googleapis');

const GOOGLE_API_FOLDER_ID = '1K5UVYYZS6PrDEJRX6QfVj8d7Ng-tBtY0';

const { InitFileUpload } = require('../file_upload');

const fileUpload = InitFileUpload();
exports.postProduct = async (req,res) => {
    let {productname, productprice, userid, productdescription, imageid} = req.body;
    const file = req.file.path;
    const name = req.file.filename;
    const mimeType = req.file.mimetype;
    const key = await fileUpload.uploadFile({ name, file, mimeType });
    imageid=key;
    let product = new Product(productname, productprice, userid, imageid, productdescription);
    console.log(product)
    product.create()
    .then((r) => {
        res.json("Product is Added!!!");
    }).catch((e) => {
        if(e){
            res.status(400).json({"err" : "Failed", e});
        }
    });
}

exports.getProduct = (req,res) => {
    const {productId} = req;
    console.log(productId);
    let sql = `SELECT * FROM products WHERE productId = ${productId};`;
    db.execute(sql)
    .then((r)=>{
        res.json(r);
    }).catch((e) => {
        if(e){
            res.status(400).json({"err" : "Failed", e});
        }
    });
}

exports.getAllProducts = (req,res) => {
    let sql = `SELECT * FROM products WHERE productStatus = 0;`;
    db.execute(sql)
    .then((r)=>{
        res.json(r);
    }).catch((e) => {
        if(e){
            res.status(400).json({"err" : "Failed", e});
        }
    });
}

exports.deleteProduct = (req,res) => {
    const {productId} = req;
    let sql = `DELETE FROM products WHERE productId = ${productId};`;
    db.execute(sql)
    .then((r)=>{
        res.status(200).json({"Msg" : "Success", r});
    }).catch((e) => {
        if(e){
            res.status(400).json({"err" : "Failed", e});
        }
    });
}
