import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY, UNAUTHORIZED } from "@/constants";
import { responseHandler } from "@/utils/response.utils";

export class QueryService<E> {
  private token: string | undefined;
  private response: responseHandler<E>;
  constructor(
    private req: NextApiRequest,
    private res: NextApiResponse,
    private entity: Model<E>,
    private isProtected: boolean = true
  ) {
    this.req = req;
    this.res = res;
    this.token =
      this.req.headers.authorization &&
      this.req.headers.authorization.split(" ")[1];
    this.response = new responseHandler<E>();
  }

  async validateToken(): Promise<boolean> {
    try {
      jwt.verify(this.token!, TOKEN_SECRET_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  async get(): Promise<E[] | void> {
    if (this.isProtected) {
      if (!(await this.validateToken())) {
        return this.response[401](this.res);
      }
    }
    return await this.entity.find();
  }

  async create(data: E): Promise<E | void> {
    if (this.isProtected) {
      if (!(await this.validateToken())) {
        return this.response[401](this.res);
      }
    }
    return await this.entity.create(data);
  }
}
