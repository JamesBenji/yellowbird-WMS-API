import { PutAwayItem } from "../../dto/PutAway.dto";

const examplePutAwayItem: PutAwayItem = {
  "inspectionBatchNo": "INSP-20231015-001",
  "clientId": "CLIENT-789",    
  "vendorId": "VENDOR-101",    
  "stockInId": "STOCK-IN-20231010-456", 
  "item": {
    "itemId": "ITEM-123",
    "description": '',
    "category": '',
    "fragilityType": null,
    "sku": "SKU-123-20231010",
    "weight": {
        "value": 2.5,
        "unit": 'kg'
    },
    "dimensions": {
        "length": 2,
        "width": 3,
        "height": 3,
        "unit": 'cm',
      }
  },
  "arrivalDate": "2023-10-10T08:00:00Z",
  "nearestExpirationDate": "2024-10-09", 
  "putAwayDate": "2023-10-12T14:30:00Z",
  "status": "active", 
  "notes": "Handle with care - fragile contents",
  "warehouseLocation": "Aisle 5, Shelf B2"
};