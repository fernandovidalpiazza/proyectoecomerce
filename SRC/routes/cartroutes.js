import express from "express";
import cartsController from "../mananger/cartmananger/cartmanger.js";

const cartsRouter = express.Router();
// esto es un comentario para mostrar a la tutora
cartsRouter.get("/", cartsController.getAllCarts);
cartsRouter.post("/", cartsController.createCart);
cartsRouter.get("/:cid", cartsController.getCartById);
cartsRouter.post("/:cid/addProduct/:pid", cartsController.addProductToCart);

//estoy seguro del git
export default cartsRouter;