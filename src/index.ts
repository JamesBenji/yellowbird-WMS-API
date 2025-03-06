import express from "express";
import notificationRouter from "./routes/notification";
import stockRouter from "./routes/stock";
import warehouseRouter from "./routes/warehouse";
import putAwayRouter from "./routes/putaway";
import dispatchedRouter from "./routes/dispatched";
import inspectionRouter from "./routes/inspection";
import stockOutRouter from "./routes/stockOut";
import { BASE_API_ROUTE_V1 } from "./config";
import { config } from "dotenv";
import cors from "cors";
import { initializeFirebase } from "./classes/database/FirebaseInit";

// dotenv config
config();
const app = express();
const PORT = process.env.PORT || 11000;
app.use(cors());
app.use(express.json());

initializeFirebase();

app.use(`${BASE_API_ROUTE_V1}/notification`, notificationRouter);
app.use(`${BASE_API_ROUTE_V1}/stock`, stockRouter);
app.use(`${BASE_API_ROUTE_V1}/warehouse`, warehouseRouter);
app.use(`${BASE_API_ROUTE_V1}/inspection`, inspectionRouter);
app.use(`${BASE_API_ROUTE_V1}/stock-out`, stockOutRouter);
app.use(`${BASE_API_ROUTE_V1}/putaway`, putAwayRouter);
app.use(`${BASE_API_ROUTE_V1}/dispatched`, dispatchedRouter);

app
  .listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
  });
