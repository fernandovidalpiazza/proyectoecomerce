import fs from 'fs';

const CART_FILE = "./addtocart.json";

class CartManager {
    constructor() {
        this.cart = [];
        this.loadCart();
    }

    async loadCart() {
        try {
            const cartData = fs.readFileSync(CART_FILE, 'utf-8');
            this.cart = JSON.parse(cartData);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("El archivo de carrito no existe. Se cargará un carrito vacío.");
                await this.saveCart(); // Crear un carrito vacío si no existe
            } else {
                console.error("Error al cargar el carrito:", error);
                throw error;
            }
        }
    }

    async addProductToCart(product) {
        this.cart.push(product);
        await this.saveCart();
    }

    async saveCart() {
        try {
            await fs.promises.writeFile(CART_FILE, JSON.stringify(this.cart, null, 2));
            console.log("Carrito guardado correctamente.");
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
            throw error;
        }
    }

    async removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.productId !== productId);
        await this.saveCart();
    }

    async getCart() {
        try {
            const data = await fs.promises.readFile(CART_FILE, 'utf-8');
            this.cart = JSON.parse(data);
            return this.cart;
        } catch (error) {
            throw new Error("Error al leer el archivo:", error);
        }
    }
}

export default CartManager;
