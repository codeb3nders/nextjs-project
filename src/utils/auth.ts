import { AccountInterface } from "@/interface";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY || "secret";

export const createToken = async (user: AccountInterface) => {
  const token = jwt.sign({ email: user.businessEmail }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (err) {
    return false;
  }
};
