
import { Router } from "express";
import ProductManager from "../product_manager.js";

const manager = new ProductManager("./productos.txt");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const limit = +req.query.limit || 0;
        const productList = manager.getProducts(limit);
        res.json({ status: 1, payload: productList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al obtener los productos" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = manager.getProductById(productId);
        if (product) {
            res.status(200).json({ status: 1, payload: product });
        } else {
            res.status(404).json({ status: 0, error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al obtener el producto" });
    }
    
    router.post("/addProducts", async (req, res) => { 
        try {
            const newProduct = req.body; 
    
            const product = manager.addProduct(newProduct);
            if (product) {
                res.status(200).json({ status: 1, payload: product });
            } else {
                res.status(404).json({ status: 0, error: "No se puede agregar productos" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 0, error: "Error al agregar productos" });
        }
    });
    
    router.put("/updateproduct/:id", async (req, res) => { 
        try {
            const productId = req.params.id; 
            const updatedProduct = req.body; 
    
            const product = manager.updateProduct(productId, updatedProduct); 
            if (product) {
                res.status(200).json({ status: 1, payload: product });
            } else {
                res.status(404).json({ status: 0, error: "No se puede actualizar el producto" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 0, error: "Error al actualizar el producto" });
        }
    });
    
  

});

export default router;

