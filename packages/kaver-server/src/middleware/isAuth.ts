import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server";
import { verify } from "jsonwebtoken";
import { IContext } from "../models/context";
import { Token } from "../models/token";
import UserCollection from "../models/user";
import AuthUtils from "../utils/auth_utils";

export const isAuth: MiddlewareFn<IContext> = async (
  { context: ctx },
  next
) => {
  if (!ctx.req.cookies) {
    ctx.res.status(401);
    throw new AuthenticationError("Not authorized");
  }

  const accessToken = ctx.req.cookies["access-token"];
  const refreshToken = ctx.req.cookies["refresh-token"];

  if (!refreshToken) {
    ctx.res.status(401);
    throw new AuthenticationError("Not authorized");
  }

  if (!accessToken) {
    await verifyRefreshToken(ctx, refreshToken);
    return next();
  }

  try {
    const tokenData = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as Token;
    ctx.token = tokenData;
  } catch (e) {
    ctx.res.status(401);
    throw new AuthenticationError("Invalid token");
  }
  return next();
};

const verifyRefreshToken = async (ctx: IContext, refreshToken: string) => {
  try {
    const tokenData = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as Token;
    ctx.token = tokenData;

    const user = await UserCollection.findById(tokenData.userId);
    if (user == null) {
      ctx.res.status(401);
      throw new AuthenticationError("User doesn't exist");
    }
    const newTokens = AuthUtils.createTokens(user);
    AuthUtils.addTokensToCookies(
      ctx.res,
      newTokens.accessToken,
      newTokens.refreshToken
    );
  } catch (e) {
    ctx.res.status(401);
    throw e;
  }
};
