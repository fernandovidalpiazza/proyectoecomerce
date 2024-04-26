import path from "path";
import config from "../../config.js";
import fs from "fs";

const carritoFilePath = path.join(config.DIRNAME, "./storage/storagecarrito/addtocart.json");
const productFilePath = path.join(config.DIRNAME, "./storage/stogrageproductos/product.json");

const cartsManager = {
  getAllCarts: (req, res) => {
    try {
      const carts = JSON.parse(fs.readFileSync(carritoFilePath, "utf-8"));
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los carritos" });
    }
  },

  createCart: (req, res) => {
    try {
      const carts = JSON.parse(fs.readFileSync(carritoFilePath, "utf-8"));
      const newCart = {
        id: carts.length + 1,
        products: [],
      };
      carts.push(newCart);
      fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el carrito" });
    }
  },

  getCartById: (req, res) => {
    try {
      const cartId = Number(req.params.cid);
      const carts = JSON.parse(fs.readFileSync(carritoFilePath, "utf-8"));
      const cart = carts.find((cart) => cart.id === cartId);
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
      res.json(cart.products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el carrito por ID" });
    }
  },
  addProductToCart: (req, res) => {
    try {
        const cartId = Number(req.params.cid);
        const productId = Number(req.params.pid);
        const quantity = req.body.quantity || 1;

        // Leer los productos desde products.json
        const products = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));

        // Encontrar el producto en la lista de productos
        const product = products.find(product => product.id === productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Leer los carritos desde addtocart.json
        let carts = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
        let cart = carts.find(cart => cart.id === cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        let productInCart = cart.products.find(item => item.product === productId);
        if (productInCart) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            productInCart.quantity += quantity;
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.products.push({ product: productId, quantity });
        }

        // Escribir los cambios de vuelta a addtocart.json
        fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
}

 
};

export default cartsManager;
