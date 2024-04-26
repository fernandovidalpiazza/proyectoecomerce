import fs from 'fs';
import { nanoid } from 'nanoid';



const STORAGE = './storage/storageproductos/product.json';

export default class ProductManager {
    constructor() {
        this.products = [];
        this.initialize();
    }

    async initialize() {
        try {
            const data = await fs.promises.readFile(STORAGE, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Si el archivo no existe, lo crearemos
                await this.saveToFile();
            } else {
                console.error("Error al inicializar el ProductManager:", error);
            }
        }
    }

    async addProduct(product) {
        const isValid =
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock;

        if (isValid && !this.products.some(p => p.code === product.code)) {
            product.id = nanoid(); // Generar un ID único para el producto
            this.products.push(product);

            try {
                await this.saveToFile();
                console.log("Producto agregado correctamente");
            } catch (error) {
                console.error("Error al agregar el producto:", error);
            }
        } else {
            console.log("Todos los campos son obligatorios o el código de producto ya existe");
        }
    }

    async saveToFile() {
        try {
            await fs.promises.writeFile(STORAGE, JSON.stringify(this.products, null, 2));
        } catch (error) {
            throw new Error("Error al guardar en el archivo:", error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(STORAGE, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;
        } catch (error) {
            throw new Error("Error al leer el archivo:", error);
        }
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            console.log("Producto encontrado:", product);
            return product;
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;

            try {
                await this.saveToFile();
                console.log("Producto actualizado correctamente");
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
            }
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async deleteProduct(id) {
        const updatedProducts = this.products.filter(product => product.id !== id);

        if (updatedProducts.length < this.products.length) {
            try {
                await fs.promises.writeFile(STORAGE, JSON.stringify(updatedProducts, null, 2));
                console.log("Producto eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async deleteFile() {
        try {
            await fs.promises.unlink(STORAGE);
            console.log("Archivo eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el archivo:", error);
        }
    }
}
