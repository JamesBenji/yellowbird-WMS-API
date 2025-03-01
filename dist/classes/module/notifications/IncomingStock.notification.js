"use strict";
/**
 * payload: IncomingStock dto
 * operations:
 *  1. receive POST data from request
 *  2. save the data in FireStore
 *  END
 *
 * The listeners on the Firestore collection will trigger other processes, namely:
 * - notifying the warehouse manager about incoming stock
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingStock = void 0;
class IncomingStock {
    constructor(DBInstance, data) {
        this.data = data;
        this.db = DBInstance;
    }
    saveIncomingStockData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.save('', this.data);
        });
    }
}
exports.IncomingStock = IncomingStock;
