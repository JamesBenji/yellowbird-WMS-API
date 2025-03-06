import { Router } from "express";
import {
  handleDeleteDispatchedById,
  handleDispatchedStock,
  handleGetDispatchedStockById,
  handleUpdateDispatchedStockById,
} from "../handlers/dispatched.handler";

const router = Router();

router.get("/released", handleGetDispatchedStockById);
router.post("/released", handleDispatchedStock);
router.post("/released/update", handleUpdateDispatchedStockById);
router.get("/released/delete", handleDeleteDispatchedById);

export default router;
