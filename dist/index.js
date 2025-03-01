"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_1 = __importDefault(require("./routes/notification"));
const stock_1 = __importDefault(require("./routes/stock"));
const warehouse_1 = __importDefault(require("./routes/warehouse"));
const config_1 = require("./config");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const FirebaseInit_1 = require("./classes/database/FirebaseInit");
// dotenv config
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
try {
    (0, FirebaseInit_1.initializeFirebase)();
    app.use(`${config_1.BASE_API_ROUTE_V1}/notification`, notification_1.default);
    app.use(`${config_1.BASE_API_ROUTE_V1}/stock`, stock_1.default);
    app.use(`${config_1.BASE_API_ROUTE_V1}/warehouse`, warehouse_1.default);
    app.get("/", (request, response) => {
        response.send("hi").status(200);
    });
    app.listen(() => {
        console.log(`RUNNING ON PORT ${PORT}`);
    });
}
catch (error) {
    console.log(error);
}
