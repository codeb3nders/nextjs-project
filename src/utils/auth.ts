import { TOKEN_SECRET_KEY } from "@/constants";
import { AccountInterface } from "@/interface";
import jwt from "jsonwebtoken";

export const createToken = async (user: AccountInterface) => {
  const token = jwt.sign({ email: user.businessEmail }, TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, TOKEN_SECRET_KEY);
    return decodedToken;
  } catch (err) {
    return false;
  }
};
