import express from 'express';
import cartsController from '../cartmanger.js';

const cartsRouter = express.Router();

cartsRouter.get('/', cartsController.getAllCarts)
cartsRouter.post('/', cartsController.createCart);
cartsRouter.get('/:cid', cartsController.getCartById);
cartsRouter.post('/:cid/addProduct/:pid', cartsController.addProductToCart);
//estoy seguro del git
export default cartsRouter;