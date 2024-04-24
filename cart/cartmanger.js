import path from 'path'
import config from '../config.js';
import fs from 'fs'



const carritoFilePath = path.join(config.DIRNAME, './cart/addtocart.json');

const cartsMananger = {

  getAllCarts: (req,res) => {
    try {
      const carts = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'))
      res.json(carts)      
  }catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }},

  createCart: (req, res) => {
    const carts = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
    try {
      const newCart = {
        id: carts.length + 1,
        products: []
      };
      carts.push(newCart);
      fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito' });
    }
  },


  getCartById: (req, res) => {
    try {
      const cartId =Number(req.params.cid);
      const carts = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
      const cart = carts.find(cart => cart.id === cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
      res.json(cart.products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el carrito por ID' });
    }
  },
  addProductToCart: (req, res) => {
    try {
      const cartId = Number(req.params.cid);
      const productId = Number(req.params.pid);
      const quantity = req.body.quantity || 1;

      let carts = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
      let cart = carts.find(cart => cart.id === cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      let productInCart = cart.products.find(item => item.product === productId);
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  }
};

export default cartsMananger;