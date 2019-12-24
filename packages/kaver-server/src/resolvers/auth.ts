import { Arg, Query, Resolver, Ctx, Mutation } from "type-graphql";
import UserCollection, { User } from "../models/user";
import { sign } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Context } from "graphql-yoga/dist/types";

@Resolver()
export default class AuthResolvers {
    @Mutation(() => User, { nullable: true })
    public async login(@Arg("username") username: string, @Arg("password") password: string, @Ctx() ctx: Context): Promise<User | null> {
        const user = await UserCollection.findOne({ where: { username } });
        if (!user || !user.password) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return null;
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
        @Arg("lastname") lastname: string, @Ctx() ctx: Context): Promise<User | null> {

        const alreadyExistedUser = await UserCollection.findOne({ where: { username } });

        if (alreadyExistedUser != null) {
            return null;
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

        ctx.res?.cookie("refresh-token", refreshToken);
        ctx.res?.cookie("access-token", accessToken);

        return user;
    }

    @Query(() => User, { nullable: true })
    public async me(@Ctx() ctx: Context): Promise<User | null> {
        if (!ctx.req.userId) {
            return null;
        }

        return UserCollection.findOne({ where: { _id: ctx.req.userId } });
    }
}
