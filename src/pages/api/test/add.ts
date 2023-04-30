import Test from "@/models/testModel";
import connectMongo from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from "@/interface/index";

import { validateTest } from "@/utils/validator";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: any }>
) {
  if (req.method === "POST") {
    const { error, value } = validateTest(req.body);
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    const { name, age, email } = value;

    // await connectMongo();

    const test = await Test.create({ name, age, email });
    console.log("CREATED TEST", test);
    return res.status(200).json(test);
  } else {
    res.status(400).json({ error: "Only POST requests allowed" });
  }
}
