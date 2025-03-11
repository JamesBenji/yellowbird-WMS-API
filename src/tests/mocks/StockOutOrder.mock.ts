import { StockOutOrderDTO } from "../../dto/StockOutOrder.dto";

export const stockOutOrderSample: StockOutOrderDTO = {
    "id": "SO-12345",
    "companyId": "C-67890",
    "items": [
      {
        "id": "ITEM-001",
        "name": "Office Chair",
        "itemQuantity": 10,
        "companyId": 'C-1',
        "itemDescription": 'mandatory',
        "itemCategory": "furniture"
      },
      {
        "id": "ITEM-002",
        "name": "Office Chair",
        "itemQuantity": 5,
        "companyId": 'C-2',
        "itemDescription": 'mandatory',
        "itemCategory": "furniture"
      },
    ],
    "comments": "Handle with care, urgent delivery",
    "logisticsProvider": "Logistics Co. Ltd",
    "creationDateTimeMillis": 12,
    "lastUpdateDateTimeMillis": 12
  };
  