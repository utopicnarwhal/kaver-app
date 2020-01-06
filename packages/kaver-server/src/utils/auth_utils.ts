import { User } from "../models/user";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export default class AuthUtils {
  public static createTokens(user: User) {
    return {
      accessToken: sign(
        { userId: user._id, jwtIterationCount: user.jwtIterationCount },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_AFTER }
      ),
      refreshToken: sign(
        { userId: user._id, jwtIterationCount: user.jwtIterationCount },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_AFTER }
      )
    };
  }

  public static addTokensToCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
  ): Response {
    res.cookie("refresh-token", refreshToken, {
      maxAge:
        parseInt(process.env.REFRESH_TOKEN_EXPIRES_AFTER_IN_SEC as string, 10) *
        1000,
      httpOnly: true
    });
    res.cookie("access-token", accessToken, {
      maxAge:
        parseInt(process.env.ACCESS_TOKEN_EXPIRES_AFTER_IN_SEC as string, 10) *
        1000,
      httpOnly: true
    });
    return res;
  }
}
