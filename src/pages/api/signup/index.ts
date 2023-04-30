import { AccountInterface } from "@/interface";
import { Account } from "@/models/account.model";
import { createToken } from "@/utils/auth";
import connectMongo from "@/utils/dbConnect";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  mongoose.connection.readyState !== 1 && (await connectMongo());

  if (req.method === "POST") {
    const { email, password } = req.body;

    const existingUser: AccountInterface | null = await Account.findOne({
      businessEmail: email,
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = new Account({ email, password });

    await user.save();

    const token = await createToken(user);

    return res.status(201).json({ token });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
