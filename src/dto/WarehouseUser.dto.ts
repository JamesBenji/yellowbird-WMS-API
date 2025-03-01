import { AccountType } from "../types/dto";

export type WMSUser = {
  userId: string;
  name: string;
  userType: AccountType;
  email: string;
  phoneNo?: string;
  callback?: string;
};
