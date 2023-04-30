import connectMongo from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountInterface } from "@/interface/index";

import { validateAccount } from "@/utils/validator";
import { Account } from "@/models/account.model";
import { uuid } from "@/utils/uuid";
import mongoose from "mongoose";
import { QueryService } from "@/services/query.service";
import { responseHandler } from "@/utils/response.utils";

mongoose.connection.readyState !== 1 && connectMongo();

export default async function addAccounts(
  req: NextApiRequest,
  res: NextApiResponse<AccountInterface | { error: any }>
) {
  const response = new responseHandler<AccountInterface>();

  if (req.method === "POST") {
    req.body.id = uuid();
    req.body.status = "approved";
    req.body.password = "123456";
    req.body.createdAt = new Date().toISOString();
    const { error, value } = validateAccount(req.body);

    if (error) {
      return response[400](res, error.details);
    }

    const account = new QueryService<AccountInterface>(req, res, Account, true);

    try {
      const createAccount = (await account.create(value)) as AccountInterface;
      return response[200](res, createAccount);
    } catch (error: any) {
      return response[400](res, error.message || error);
    }
  } else {
    return response[400](res);
  }
}
