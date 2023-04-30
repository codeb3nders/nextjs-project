import { AccountInterface } from "@/interface";
import { uuid } from "@/utils/uuid";
import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const AccountSchema = new Schema<AccountInterface>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
    required: true,
    unique: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  businessContactNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  password: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
  },
});

AccountSchema.pre<AccountInterface>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

AccountSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const Account = models.Account || model("Account", AccountSchema);
