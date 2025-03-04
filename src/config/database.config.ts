// config/dependencies.ts
import { INCOMING_STOCK_COLLECTION_NAME, INSPECTION_COLLECTION_NAME, STOCK_IN_COLLECTION_NAME } from ".";
import { FirebaseDB } from "../classes/database/providers/FirebaseDB";
import { IncomingStock } from "../classes/module/notifications/IncomingStock.notification";
import { InspectionModule } from "../classes/module/proc/ItemInspection.proc";
import { Returns } from "../classes/module/proc/Returns.proc";
import { StockIn } from "../classes/module/proc/StockIn.proc";
import { IncomingStockInterface } from "../dto/IncomingStock.dto";
import { InspectionResults } from "../dto/InspectionResults.dto";
import { StockInType } from "../dto/StockIn.dto";

const incomingStockDB = new FirebaseDB<IncomingStockInterface>(
  INCOMING_STOCK_COLLECTION_NAME
);

const stockInDB = new FirebaseDB<StockInType>(STOCK_IN_COLLECTION_NAME)
const inspectionDB = new FirebaseDB<InspectionResults>(INSPECTION_COLLECTION_NAME)

export function CreateIncomingStockInstance() {
  return new IncomingStock(incomingStockDB);
}

export function CreateStockInInstance() {
  return new StockIn(stockInDB);
}
export function CreateReturnsInstance() {
  return new Returns();
}

export function CreateInspectionInstance() {
  const returnsInstance = CreateReturnsInstance();
  return new InspectionModule(inspectionDB, returnsInstance)
}