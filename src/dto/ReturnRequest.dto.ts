export type ReturnStatusTypes =
  | "Initiated"
  | "Authorized"
  | "In-Transit"
  | "Received"
  | "Inspected"
  | "Processed"
  | "Completed";

export type ReturnItem = {
  itemId: string;
  quantity: number;
  condition: string;
  customerNotes?: string;
};

export type ContactDetails = {
  email: string;
  phone?: string;
};

export type CustomerInfo = {
  customerId: string;
  name: string;
  contactDetails: ContactDetails;
};

export type ReturnRequest = {
  returnId: string;
  orderId: string;
  customerInfo: CustomerInfo;
  returnReason: string;
  returnItems: Array<ReturnItem>;
  returnStatus: ReturnStatusTypes;
  creationDate: Date;
};
