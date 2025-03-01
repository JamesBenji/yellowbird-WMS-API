// config/dependencies.ts
import { INCOMING_STOCK_COLLECTION_NAME } from ".";
import { FirebaseDB } from "../classes/database/providers/FirebaseDB";
import { IncomingStock } from "../classes/module/notifications/IncomingStock.notification";
import { IncomingStockInterface } from "../dto/IncomingStock.dto";

const incomingStockCollection = new FirebaseDB<IncomingStockInterface>(
  INCOMING_STOCK_COLLECTION_NAME
);

export function CreateIncomingStockInstance(dto: IncomingStockInterface) {
  return new IncomingStock(incomingStockCollection, dto);
}
