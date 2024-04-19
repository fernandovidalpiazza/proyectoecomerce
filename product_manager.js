import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [
      {
        title: "Producto 1",
        description: "Descripción del Producto 1",
        price: 100,
        thumbnail: "ruta/imagen1.jpg",
        code: "P001",
        stock: 10,
      },
      {
        title: "Producto 2",
        description: "Descripción del Producto 2",
        price: 150,
        thumbnail: "ruta/imagen2.jpg",
        code: "P002",
        stock: 20,
      },
    ];
    this.fileName = "productos.txt";
    this.createFile();
  }
  async createFile() {
    if (!fs.existsSync(this.fileName)) {
      try {
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.products, null, 2)
        );
        console.log(`Archivo ${this.fileName} creado correctamente.`);
      } catch (error) {
        console.error(`Error al crear el archivo ${this.fileName}:`, error);
      }
    } else {
      console.log(`El archivo ${this.fileName} ya existe.`);
    }
  }
  async loadFromFile() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error(
        "Error al cargar productos desde el archivo:",
        error.message
      );
    }
  }

  async saveToFile() {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.products, null, 2)
      );
      console.log("Datos guardados en el archivo correctamente");
    } catch (error) {
      console.error("Error al escribir en el archivo:", error.message);
    }
  }

  addProduct(product) {
    const isValid =
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock;
    const isDuplicate = this.products.some((p) => p.code === product.code);

    if (isValid) {
      if (isDuplicate) {
        console.log("Ya existe un producto con este código");
      } else {
        this.products.push(product);
        this.saveToFile(); // aca es donde guardo
        console.log("Producto agregado correctamente");
      }
    } else {
      console.log("Todos los campos son obligatorios");
    }
  }

  getProducts(limit) {
    // Si se proporciona un límite válido y mayor que 0, devuelve los primeros 'limit' productos
    if (limit && limit > 0) {
      return this.products.slice(0, limit);
    } else {
      // Si no se proporciona un límite válido o es 0, devuelve todos los productos
      return this.products;
    }
  }

  getProductById(id) {
    const product = this.products.find((p) => p.code === id);
    return product ? product : null;
  }

  async deleteProductById(id) {
    const index = this.products.findIndex((p) => p.code === id);

    if (index !== -1) {
      const deletedProduct = this.products[index];

      this.products.splice(index, 1);

      try {
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.products, null, 2)
        );

        console.log("Datos guardados en el archivo correctamente");

        console.log("Producto eliminado correctamente:", deletedProduct);

        return deletedProduct;
      } catch (error) {
        console.error("Error al escribir en el archivo:", error.message);

        return null;
      }
    } else {
      console.log("Producto no encontrado");

      return null;
    }
  }

  //aqui hice la correccion para que en la consola no aparezca undefind

  async updateProduct(id, updatedFields) {
    try {
      // Leer el producto txt
      const data = await fs.promises.readFile(this.fileName, "utf8");
      const products = JSON.parse(data);

      // ahora lo busco
      const productIndex = products.findIndex((p) => p.code === id);
      if (productIndex !== -1) {
        // Actualizar y con esto actualizo
        for (let field in updatedFields) {
          if (field && field !== "code") {
            products[productIndex][field] = updatedFields[field];
          }
        }

        // y con esto de nuevo regrabo el archivo si cambio algo
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(products, null, 2)
        );
        console.log("Producto actualizado correctamente");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
    }
  }
}

export default ProductManager;
