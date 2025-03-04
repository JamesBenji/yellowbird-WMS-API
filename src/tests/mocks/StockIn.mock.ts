const x = [{
    "stockInId": "RCPT-2025-0301-001",
    "noticeId": "NOTICE-2025-001",
    "actualArrivalDate": "2025-10-02T01:22:2223Z",
    "receivedItems": [
      {
        "id": "ITEM-10001",
        "expectedQuantity": 50,
        "actualQuantity": 48,
        "condition": "Good"
      },
      {
        "id": "ITEM-10002",
        "expectedQuantity": 25,
        "actualQuantity": 25,
        "condition": "Excellent"
      },
      {
        "id": "ITEM-10003",
        "expectedQuantity": 30,
        "actualQuantity": 28,
        "condition": "Damaged"
      }
    ],
    "discrepancies": [
      {
        "id": "ITEM-10001",
        "discrepancyType": "Quantity",
        "description": "2 units short from expected quantity",
        "resolutionStatus": "Pending"
      },
      {
        "id": "ITEM-10003",
        "discrepancyType": "Condition",
        "description": "2 units with torn packaging",
        "resolutionStatus": "Under Review"
      }
    ],
    "receivedBy": "John Doe",
    "notes": "Shipment arrived 1 day later than scheduled",
    "clientId": "CLIENT-001",
    "vendorId": "VENDOR-005",
    "warehouseId": "WH-NORTH-01"
  }]


  const y = [{
    "noticeId": "NOTICE-2023-001",
    "actualArrivalDate": "2023-08-15T14:30:00Z",
    "receivedItems": [
      {
        "id": "ITEM-001",
        "expectedQuantity": 100,
        "actualQuantity": 95,
        "condition": "Damaged"
      },
      {
        "id": "ITEM-002",
        "expectedQuantity": 200,
        "actualQuantity": 200,
        "condition": "Good"
      }
    ],
    "discrepancies": [
      {
        "itemId": "ITEM-001",
        "discrepancyType": "Quantity",
        "description": "Short by 5 units",
        "resolutionStatus": "Pending vendor confirmation"
      },
      {
        "itemId": "ITEM-001",
        "discrepancyType": "Condition",
        "description": "Water damage on packaging"
      }
    ],
    "receivedBy": "EMP-1234",
    "notes": "Pallet 3 had visible water damage",
    "clientId": "CLIENT-ACME",
    "vendorId": "VENDOR-SHIPCO",
    "warehouseId": "WAREHOUSE-01"
  }]