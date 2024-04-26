import express from "express";
import productRoutes from "./routes/usersroutes.js";
import cartRoutes from "./routes/cartroutes.js";
import config from "./config.js";

const app = express();

// Middleware para el manejo de JSON
app.use(express.json());

// Utiliza las rutas de productos
app.use("/api/products", productRoutes);
app.use("/api/products/:productId", productRoutes);
app.use("/api/addProduct", productRoutes);
app.use("/api/updateProduct", productRoutes);
app.use("/api/delete", productRoutes);

// Utiliza las rutas del carrito

app.use("/api/carts", cartRoutes);

// Ruta estática para servir archivos estáticos
app.use("/static", express.static(`${config.DIRNAME}/public`));

// Inicia el servidor
app.listen(config.PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${config.PORT}`);
});
