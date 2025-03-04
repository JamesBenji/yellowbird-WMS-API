import { InspectionResults } from "../../dto/InspectionResults.dto";

const exampleInspection = [{
    "inspectionBatchNo": "BATCH-20240315-001",
    "inspectedItems": [
      {
        "itemId": "ITEM-123",
        "units": 50,
        "hasPassed": true,
        "sku": "SKU-123-20240315",
        "inspectionBatch": '2025-03-01'
      }
    ],
    "inspectionDate": "2024-03-15T14:30:00Z",
    "inspector": {
      "name": "Jane Doe",
      "id": "INSPECTOR-456"
    },
    "notes": "Minor packaging issues on 10% of batch",
    "stockInId": "STOCK-IN-20240301-1234",
    "clientId": "CLIENT-789",
    "vendorId": "VENDOR-101"
  }];