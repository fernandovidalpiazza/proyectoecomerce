import express from "express";
import handlebars from "express-handlebars";
import productRoutes from "./routes/usersroutes.js";
import cartRoutes from "./routes/cartroutes.js";
import config from "./config.js";
import { viewRutes } from "./routes/viewrutes.js";
import ProductManager from "./mananger/prodoctmanger/product_manager.js";

//crea un servidor 
import { Server } from "socket.io";



const app = express();
const manager = new ProductManager();
//const httpServer = createServer(app);
//const io = new Server(httpServer);

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${config.DIRNAME}/views`);
app.set("view engine", "handlebars");

// Middleware para el manejo de JSON
app.use(express.json());

// Acceso a vistas (plantillas Handlebars)
//app.use("/", viewsRouter);
// Acceso a endponts de la API
//app.use("/api/users", usersRouter);
// Acceso a contenidos estáticos
app.use("/static", express.static(`${config.DIRNAME}/public`));

// Utiliza las rutas de productos
app.use("/api/products", productRoutes);
app.use("/api/products/:productId", productRoutes);
app.use("/api/addProduct", productRoutes);
app.use("/api/updateProduct", productRoutes);
app.use("/api/delete", productRoutes);

// este es un link para mi carrito
app.use("/api/carts", cartRoutes);

// Ruta estática para servir archivos estáticos
app.use("/static", express.static(`${config.DIRNAME}/public`));

//aqui rutas de handlebars

app.use("/", viewRutes);

// Inicia el servidor

const httpServer = app.listen(config.PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${config.PORT}`);
});
const soketServer = new Server(httpServer);
app.set("socket", soketServer);



// Manejador de eventos de WebSocket
//io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  // Manejar eventos de WebSocket aquí
  soketServer.on("connection", socket => {
    socket.on("addProduct", product => {
        console.log("Nuevo producto recibido", product); 
        socket.emit("productagregado", product);
    });
    // Manejar evento para eliminar productos
    
    socket.on("deleteProduct", productId => {
      console.log("Se solicita eliminar el producto", productId);
      manager.deleteProduct(productId) // Llamar al método deleteProduct de ProductManager
          .then(() => {
              // Emitir evento a todos los clientes conectados
              soketServer.emit("productEliminado", productId);
              console.log(productId, "eliminado para siempre");
              soketServer.emit("refreshProductList", manager.getProducts());
          })
          .catch(error => {
              console.error(error);
              socket.emit("error", error);
          });
          
  });
});
  
  





