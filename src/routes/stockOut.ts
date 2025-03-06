import { Router } from "express";
import {
  handleDeleteStockOutById,
  handleGetStockOutById,
  handleStockOut,
  handleUpdateStockOutById,
} from "../handlers/stockOut.handler";

const router = Router();

router.get("/out", handleGetStockOutById);
router.post("/out", handleStockOut);
router.post("/out/update", handleUpdateStockOutById);
router.get("/out/delete", handleDeleteStockOutById);

export default router;
