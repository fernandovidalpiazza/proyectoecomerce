import { Router } from 'express';
import CartManager from '../CartManager.js';


const router = Router();
const cartManager = new CartManager();

router.post('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await cartManager.addProductToCart(productId);
        res.status(200).json({ status: 1, message: "Producto agregado al carrito correctamente" });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ status: 0, error: "Error al agregar producto al carrito" });
    }
});

router.delete('/removeFromCart/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await cartManager.removeFromCart(productId);
        res.status(200).json({ status: 1, message: "Producto eliminado del carrito correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ status: 0, error: "Error al eliminar producto del carrito" });
    }
});

router.get('/', async (req, res) => {
    try {

        const cart = await cartManager.getCart();
        console.log("Contenido del carrito:", cart); // Agregar console.log aquí
        res.status(200).json({ status: 1, cart });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ status: 0, error: "Error al obtener el carrito" });
    }
});

router.post('/createCart', async (req, res) => {
    try {
        await cartManager.createCart();
        res.status(200).json({ status: 1, message: "Carrito creado correctamente" });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ status: 0, error: "Error al crear el carrito" });
    }
});

export default router;