import { NextApiRequest, NextApiResponse } from "next";

import { Account } from "@/models/account.model";
import mongoose from "mongoose";
import connectMongo from "@/utils/dbConnect";

mongoose.connection.readyState !== 1 && connectMongo();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log("CONNECTION STATE", mongoose.connection.readyState);

  switch (method) {
    case "GET":
      try {
        const accounts = await Account.find({});
        res.status(200).json(accounts);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
      break;

    case "POST":
      console.log("====================================");
      try {
        const account = await Account.create(req.body);
        res.status(201).json(account);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
