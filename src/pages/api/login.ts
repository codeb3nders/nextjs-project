import { Account } from "@/models/account.model";
import { IUser } from "@/models/user.model";
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

    const user: IUser | null = await Account.findOne({ businessEmail: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createToken(user);

    return res.status(200).json({ token });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
