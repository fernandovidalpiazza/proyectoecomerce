import { Router } from "express";
import ProductManager from "../mananger/prodoctmanger/product_manager.js";

const manager = new ProductManager(); // Se instancia el ProductManager
const router = Router();

router.get("/", async (req, res) => {
    try {
        const productList = await manager.getProducts();
        res.json({ status: 1, payload: productList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al obtener los productos" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const productId = +req.params.id;
        const product = await manager.getProductById(productId);
        if (product) {
            res.status(200).json({ status: 1, payload: product });
        } else {
            res.status(404).json({ status: 0, error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al obtener el producto" });
    }
});

router.post("/", async (req, res) => { 
    try {
        const newProduct = req.body; 

        await manager.addProduct(newProduct);
        res.status(200).json({ status: 1, message: "Producto agregado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al agregar productos" });
    }
});

// Otras rutas corregidas también deben seguir el mismo formato

router.put("/:id", async (req, res) => {
    try {
        const productId = +req.params.id;
        const updatedProduct = req.body;

        await manager.updateProduct(productId, updatedProduct);
        res.status(200).json({ status: 1, message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al actualizar el producto" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const productId = +req.params.id;
        await manager.deleteProduct(productId);
        res.status(200).json({ status: 1, message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al eliminar el producto" });
    }
});

router.delete("/deleteFile", async (req, res) => {
    try {
        await manager.deleteFile();
        res.status(200).json({ status: 1, message: "Archivo eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, error: "Error al eliminar el archivo" });
    }
});

export default router;