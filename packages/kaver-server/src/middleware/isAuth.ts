import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server";
import { verify } from "jsonwebtoken";
import { IContext } from "../models/context";

export const isAuth: MiddlewareFn<IContext> = async ({ context }, next) => {
  if (!context.req.cookies || !context.req.cookies["access-token"]) {
    context.res.status(401);
    throw new AuthenticationError("Not authenticated");
  }

  console.log(context.req.cookies["access-token"]);
  const accessToken = context.req.cookies["access-token"];
  try {
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as any;
    (context.req as any).userId = data.userId;
  } catch (e) {
    console.log(e);
  }

  return next();
};
