
import express from "express";
import productRoutes from "./routes/usersroutes.js"; 
import config from "./config.js";
import router from "./cart/routes/cartroutes.js";

const app = express();

app.use(express.json());

// Utiliza las rutas de productos
app.use("/api/products", productRoutes);
app.use("/cid/products/:productId", productRoutes); 
app.use("/api/addProduct", productRoutes); 
app.use("/api/updateProduct", productRoutes); 
app.use("/api/delete", productRoutes);


//crear carrito



// Ruta estática para servir archivos estáticos
app.use('/static', express.static(`${config.DIRNAME}/public`));

// Utiliza las rutas del carrito
app.use("/api/cart", router);
app.use("/api/cart/addToCart/:productId", router);
app.use("/api/cart/removeFromCart/:productId", router);



app.listen(config.PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${config.PORT}`);
});
