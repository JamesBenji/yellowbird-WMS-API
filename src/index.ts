import express from "express";
import stockRouter from "./routes/stock";
import warehouseRouter from "./routes/warehouse";

const app = express();

const PORT = process.env.PORT || 4000;

app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/warehouse", warehouseRouter);

app.listen(() => {
  console.log(`RUNNING ON PORT ${PORT}`);
});
