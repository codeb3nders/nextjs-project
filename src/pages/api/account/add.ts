import connectMongo from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountInterface } from "@/interface/index";

import { validateAccount } from "@/utils/validator";
import { Account } from "@/models/account.model";
import { uuid } from "@/utils/uuid";
import mongoose from "mongoose";

export default async function addAccounts(
  req: NextApiRequest,
  res: NextApiResponse<AccountInterface | { error: any }>
) {
  if (req.method === "POST") {
    req.body.id = uuid();
    req.body.status = "approved";
    req.body.password = "123456";
    req.body.createdAt = new Date().toISOString();
    const { error, value } = validateAccount(req.body);
    if (error) {
      return res.status(400).json({ error: error.details });
    }

    try {
      mongoose.connection.readyState !== 1 && (await connectMongo());
      console.log("CONNECTED TO MONGO", value);

      const test = await Account.create(value);
      console.log("CREATED ACCOUNT", test);
      return res.status(200).json(test);
    } catch (error: any) {
      console.log("ERROR", error.message);
      res.status(400).json(error.message || error);
    }
  } else {
    res.status(400).json({ error: "Only POST requests allowed" });
  }
}
