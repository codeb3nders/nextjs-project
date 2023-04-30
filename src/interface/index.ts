import { Document } from "mongoose";

export interface Data {
  name: string;
  age: number;
  email: string;
  number: number;
}

export interface AccountInterface extends Document {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  contactNumber: string;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  businessContactNumber: string;
  status: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}
