import express from "express";
import stockRouter from "./routes/stock";
import warehouseRouter from "./routes/warehouse";
import { BASE_API_ROUTE_V1 } from "./config";
import { config } from "dotenv";
import cors from "cors";

// dotenv config
config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(`${BASE_API_ROUTE_V1}/stock`, stockRouter);
app.use(`${BASE_API_ROUTE_V1}/warehouse`, warehouseRouter);

app.listen(() => {
  console.log(`RUNNING ON PORT ${PORT}`);
});
