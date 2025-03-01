"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// /api/v1/warehouse/status
router.post('/status');
// /api/v1/warehouse/items
router.post('/items');
exports.default = router;
