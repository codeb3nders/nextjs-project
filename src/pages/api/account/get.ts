import connectMongo from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountInterface } from "@/interface";
import { Account } from "@/models/account.model";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY || "secret";

mongoose.connection.readyState !== 1 && connectMongo();

async function validateToken(token: string) {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

export default async function getAccounts(
  req: NextApiRequest,
  res: NextApiResponse<AccountInterface[] | { error: any }>
) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!(await validateToken(token!))) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const test = await Account.find();

    return res.status(200).json(test);
  } else {
    res.status(400).json({ error: "Only GET requests allowed" });
  }
}

function Component(target: Function) {
  target.prototype.id = 100;
}

function MethodTest(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target, propertyKey, descriptor);
}

@MethodTest
function  SecontTestClass() {
  const elementId: string = ""
  const id: number =100

 
  console.log("sadfasfasd", elementId, id)
}

@Component
class TestClass {
  static elementId: string;
  id: number | undefined;

  @MethodTest
  printId(prefix: string = ""): string {
    return prefix + this.id;
  }
}
