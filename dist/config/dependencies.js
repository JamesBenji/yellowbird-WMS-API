"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIncomingStockInstance = CreateIncomingStockInstance;
// config/dependencies.ts
const _1 = require(".");
const FirebaseDB_1 = require("../classes/database/providers/FirebaseDB");
const IncomingStock_notification_1 = require("../classes/module/notifications/IncomingStock.notification");
const incomingStockCollection = new FirebaseDB_1.FirebaseDB(_1.INCOMING_STOCK_COLLECTION_NAME);
function CreateIncomingStockInstance(dto) {
    return new IncomingStock_notification_1.IncomingStock(incomingStockCollection, dto);
}
