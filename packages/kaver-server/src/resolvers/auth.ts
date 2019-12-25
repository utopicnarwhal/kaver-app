import { Arg, Query, Resolver, Ctx, Mutation } from "type-graphql";
import UserCollection, { User } from "../models/user";
import { sign } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Context } from "graphql-yoga/dist/types";
import { IContext } from "../models/context";
import { AuthenticationError } from "apollo-server";

@Resolver()
export default class AuthResolvers {
    @Mutation(() => User, { nullable: true })
    public async login(@Arg("username") username: string, @Arg("password") password: string, @Ctx() ctx: Context): Promise<User | null> {
        const user = await UserCollection.findOne({ username });
        if (!user || !user.password) {
            throw new AuthenticationError("Unregistered user");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError("Invalid password");
        }

        const accessToken = sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IS });
        const refreshToken = sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IS });

        ctx.res.cookie("refresh-token", refreshToken);
        ctx.res.cookie("access-token", accessToken);

        return {
            lastname: user.lastname,
            firstname: user.firstname,
            id: user.id
        } as User;
    }

    @Mutation(() => User, { nullable: true })
    public async register(@Arg("username") username: string, @Arg("password") password: string, @Arg("firstname") firstname: string,
        @Arg("lastname") lastname: string, @Ctx() ctx: IContext): Promise<User | null> {

        const alreadyExistedUser = await UserCollection.findOne({ username });

        if (alreadyExistedUser != null) {
            throw new AuthenticationError("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user: User = {
            firstname,
            lastname,
            password: hashedPassword,
            username
        };

        user = await UserCollection.create(user);
        user.password = undefined;

        const accessToken = sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IS });
        const refreshToken = sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IS });

        ctx.res.cookie("refresh-token", refreshToken);
        ctx.res.cookie("access-token", accessToken);

        return user;
    }

    @Query(() => User, { nullable: true })
    public async me(@Ctx() ctx: Context): Promise<User | null> {
        if (!ctx.req.userId) {
            return null;
        }

        return UserCollection.findById(ctx.req.userId);
    }
}
