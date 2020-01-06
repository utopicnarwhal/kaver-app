import { Query, Resolver, UseMiddleware, Ctx, FieldResolver } from "type-graphql";
import { Song } from "../models/song";
import { isAuth } from "../middleware/isAuth";
import { IContext } from "../models/context";
import { User } from "../models/user";

@Resolver(() => User)
export default class UserResolver {
    @Query(() => [Song], { nullable: true })
    @UseMiddleware(isAuth)
    @FieldResolver()
    public async favoriteSongs(@Ctx() ctx: IContext): Promise<Song[] | null> {
        // console.log(ctx);
        if (!ctx.token) {
            return null;
        }

        return null;
    }

    @Query(() => [Song], { nullable: true })
    @UseMiddleware(isAuth)
    @FieldResolver()
    public async kaveredSongs(@Ctx() ctx: IContext): Promise<Song[] | null> {
        // console.log(ctx);
        if (!ctx.token) {
            return null;
        }

        return null;
    }
}
