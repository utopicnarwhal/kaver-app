import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server";
import { verify } from "jsonwebtoken";
import { IContext } from "../models/context";
import { Token } from "../models/token";

export const isAuth: MiddlewareFn<IContext> = async ({ context }, next) => {
  if (!context.req.cookies || !context.req.cookies["access-token"]) {
    context.res.status(401);
    throw new AuthenticationError("Not authenticated");
  }

  console.log(context.req.cookies["access-token"]);
  const accessToken = context.req.cookies["access-token"];

  const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as Token;
  context.token = data;

  return next();
};
