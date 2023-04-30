import { BAD_REQUEST, UNAUTHORIZED } from "@/constants";
import { NextApiResponse } from "next";

export class responseHandler<E> {
  401(res: NextApiResponse, message: string = UNAUTHORIZED) {
    console.log({ message });
    return res.status(401).json({ error: message || UNAUTHORIZED });
  }

  200(res: NextApiResponse, data: E | E[] | void) {
    return res.status(200).json(data);
  }

  400(res: NextApiResponse, message: object | string = BAD_REQUEST) {
    return res.status(400).json({ error: message || BAD_REQUEST });
  }
}
