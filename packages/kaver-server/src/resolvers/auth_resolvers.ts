import {
  Arg,
  Query,
  Resolver,
  Ctx,
  Mutation,
  UseMiddleware
} from "type-graphql";
import UserCollection, { User } from "../models/user";
import * as bcrypt from "bcrypt";
import { Context } from "graphql-yoga/dist/types";
import { IContext } from "../models/context";
import { AuthenticationError } from "apollo-server";
import { isAuth } from "../middleware/isAuth";
import AuthUtils from "../utils/auth_utils";

@Resolver()
export default class AuthResolver {
  @Query(() => User, { nullable: true })
  public async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() ctx: IContext
  ): Promise<User | null> {
    const user = await UserCollection.findOne({ username });
    if (!user || !user.password) {
      throw new AuthenticationError("Unregistered user");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError("Invalid password");
    }

    const { accessToken, refreshToken } = AuthUtils.createTokens(user);
    AuthUtils.addTokensToCookies(ctx.res, accessToken, refreshToken);

    return user;
  }

  @Mutation(() => User, { nullable: true })
  public async register(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Ctx() ctx: IContext
  ): Promise<User | null> {
    const alreadyExistedUser = await UserCollection.findOne({ username });

    if (alreadyExistedUser != null) {
      throw new AuthenticationError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user: User = {
      firstname,
      lastname,
      password: hashedPassword,
      username,
      jwtIterationCount: 0
    };

    user = await UserCollection.create(user);
    user.password = undefined;

    const { accessToken, refreshToken } = AuthUtils.createTokens(user);
    AuthUtils.addTokensToCookies(ctx.res, accessToken, refreshToken);

    return user;
  }

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  public async me(@Ctx() ctx: Context): Promise<User | null> {
    return UserCollection.findById(ctx.token.userId);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  public async invalidateTokens(@Ctx() ctx: Context) {
    const user = await UserCollection.findById(ctx.token.userId);
    if (!user) {
      return false;
    }
    user.jwtIterationCount += 1;
    await user.save();

    ctx.res.clearCookie("access-token");
    ctx.res.clearCookie("refresh-token");

    return true;
  }
}
