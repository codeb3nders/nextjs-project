import { NextApiRequest, NextApiResponse } from "next";
import { Account } from "@/models/account.model";
import connectMongo from "@/utils/dbConnect";
import mongoose from "mongoose";

mongoose.connection.readyState !== 1 && connectMongo();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
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
