export type ClientContactPerson = {
  name: string;
  email: string;
  phone: string;
};

export type ClientItem = {
  itemId: string;
  quantity: number;
  description: string;
  category: string;
};

export type StockOrigin = {
  address: string;
  latitude: number;
  longitude: number;
};
