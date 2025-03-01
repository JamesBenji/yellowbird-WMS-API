import { IncomingStockInterface } from "../../dto/IncomingStock.dto";

const data: IncomingStockInterface = {
  noticeId: "NOTICE-12345",
  clientId: "CLIENT-001",
  vendorId: "VENDOR-XYZ",
  warehouseId: "WAREHOUSE-789",
  clientContactPerson: {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  },
  items: [
    {
      id: "ITEM-001",
      name: "Wooden Chair",
      description: "A high-quality wooden chair",
      stockUnits: 100,
      dimensions: {
        length: 50,
        width: 40,
        height: 90,
        unit: "cm",
      },
      weight: {
        value: 5,
        unit: "kg",
      },
    },
    {
      id: "ITEM-002",
      name: "Office Desk",
      description: "A modern office desk",
      stockUnits: 50,
      dimensions: {
        length: 120,
        width: 60,
        height: 75,
        unit: "cm",
      },
      weight: {
        value: 20,
        unit: "kg",
      },
    },
  ],
  expectedArrivalDate: "2025-03-10T12:00:00Z",
  orderSummaryLine: "2 items arriving from Vendor XYZ",
  qrCode: "https://example.com/qrcode/NOTICE-12345",
  callback: "https://example.com/api/stock-notifications",
  timestamp: "2025-03-10T12:00:00Z",
};
