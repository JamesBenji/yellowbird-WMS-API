"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stock_1 = require("../handlers/stock");
const router = (0, express_1.Router)();
/**
 * API: /api/v1/stock/incoming
 * DESCRIPTION: allows the caller to notify the warehouse of incoming stock
 * PARAMS: See <IncomingStock>
 */
router.post('/incoming', stock_1.handleIncomingStock);
/**
 * API: /api/v1/stock/delivery/status
 * DESCRIPTION: allows the caller to request a status update on the delivery of a stock batch
 * PARAMS: See <IncomingStock>
 * RESOLUTION: This will be implemented by a callback to the client's system. In case of any failure, a log of callbacks made to the client will support system recovery.
 */
// router.post('/delivery/status', handleStockDeliveryStatus)
exports.default = router;
