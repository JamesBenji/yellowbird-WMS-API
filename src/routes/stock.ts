import { Router } from "express";
import { handleIncomingStock } from "../handlers/stock";

const router = Router();

// /api/v1/stock/incoming
router.post('/incoming', handleIncomingStock)

// /api/v1/stock/delivery
// router.post('/delivery', )

// /api/v1/stock/delivery/status
router.post('/delivery/status', handleStockDeliveryStatus)

export default router;