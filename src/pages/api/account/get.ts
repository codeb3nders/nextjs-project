import connectMongo from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountInterface } from "@/interface";
import { Account } from "@/models/account.model";
import mongoose from "mongoose";
import { QueryService } from "@/services/query.service";
import { responseHandler } from "@/utils/response.utils";

mongoose.connection.readyState !== 1 && connectMongo();

export default async function getAccounts(
  req: NextApiRequest,
  res: NextApiResponse<AccountInterface[] | { error: any }>
) {
  const response = new responseHandler<AccountInterface[] | void>();
  const accounts = new QueryService<AccountInterface>(req, res, Account, true);

  if (req.method === "GET") {
    const test = await accounts.get();
    return response[200](res, test);
  } else {
    return response[400](res);
  }
}
