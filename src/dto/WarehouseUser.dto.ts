import { AccountType } from "../types/dto";
import { SharedProperties } from "./shared/Shared.dto";

export type WMSUser = SharedProperties & {
  id: string;
  name: string;
  userType?: AccountType;
  email?: string;
  phoneNo?: string;
};
