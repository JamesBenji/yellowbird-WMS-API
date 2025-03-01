"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStockDeliveryStatus = exports.handleIncomingStock = void 0;
const handleIncomingStock = (request, response) => {
    const data = request.body;
    console.log({
        incomingStock: data
    });
};
exports.handleIncomingStock = handleIncomingStock;
const handleStockDeliveryStatus = (request, response) => {
};
exports.handleStockDeliveryStatus = handleStockDeliveryStatus;
