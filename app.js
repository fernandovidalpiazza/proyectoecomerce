import Express from "express";
import endponit from "./routes/usersroutes.js";
import config from "./config.js";

const app = Express();

app.use(Express.json());

app.use("/api/products", endponit);
app.use("/api/products/id", endponit);
app.use("/api/addproducts", endponit);
app.use("/api/updateproduct/id", endponit);

app.use('/static', Express.static(`${config.DIRNAME}/public`));




app.listen(config.PORT, () => {
  console.log(` exelente el puerto 8080 esta escuchando! ${config.PORT}`);
});
