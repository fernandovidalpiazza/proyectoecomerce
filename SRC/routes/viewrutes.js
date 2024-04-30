import express  from 'express';
import fs from 'fs';
import config from '../config.js';
import path from 'path';

export const viewRutes = express.Router(); 

const filePath = path.join(config.DIRNAME, "./storage/storageproductos/product.json");

//rutas

viewRutes.get('/home', (req, res) => {
const productData = JSON.parse(fs.readFileSync(filePath, "utf-8"));  

res.render("home", { title: 'home',products: productData });

})

viewRutes.get('/realtimeproducts', (req, res) => {
    const productData = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
    res.render("realTimeProducts", { title: 'realtime',products: productData });
    
    })