import Test from "@/models/testModel";
import connectMongo from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from "@/interface/index";

import { validateTest } from "@/utils/validator";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { error: any }>
) {
  if (req.method === "GET") {
    // await connectMongo();

    const test = await Test.find();

    return res.status(200).json(test);
  } else {
    res.status(400).json({ error: "Only GET requests allowed" });
  }
}
