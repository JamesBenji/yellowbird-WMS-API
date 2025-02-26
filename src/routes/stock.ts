import { Router } from "express";
import { handleIncomingStock, handleStockDeliveryStatus } from "../handlers/stock";

const router = Router();

/**
 * API: /api/v1/stock/incoming
 * DESCRIPTION: allows the caller to notify the warehouse of incoming stock
 * PARAMS: See <IncomingStock>
 */
router.post('/incoming', handleIncomingStock)


/**
 * API: /api/v1/stock/delivery/status
 * DESCRIPTION: allows the caller to request a status update on the delivery of a stock batch
 * PARAMS: See <IncomingStock>
 * RESOLUTION: This will be implemented by a callback to the client's system. In case of any failure, a log of callbacks made to the client will support system recovery.
 */
// router.post('/delivery/status', handleStockDeliveryStatus)

export default router;