import { Router } from "express";
import {
  handleDeleteStockInById,
  handleUpdateStockInById,
  handleGetStockInById,
  handleIncomingStock,
  handleStockIn,
} from "../handlers/stock.handler";

const router = Router();

/**
 * API: /api/v1/stock/incoming
 * DESCRIPTION: allows the caller to notify the warehouse of incoming stock
 * PARAMS: See <IncomingStock>
 */
router.post("/incoming", handleIncomingStock);

router.get("/in", handleGetStockInById);
router.post("/in", handleStockIn);
router.post("/in/update", handleUpdateStockInById);
router.get("/in/delete", handleDeleteStockInById);

export default router;
