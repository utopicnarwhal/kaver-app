import { Arg, Query, Resolver, UseMiddleware, Ctx } from "type-graphql";
import SongCollection, { Song } from "../models/song";
import { isAuth } from "../middleware/isAuth";
import { Context } from "graphql-yoga/dist/types";

@Resolver()
export default class SongResolver {
    @Query(() => Song, { nullable: true })
    public async getSongById(@Arg("id") id: string): Promise<Song | null> {
        return (await SongCollection.findById(id));
    }

    @Query(() => Song)
    @UseMiddleware(isAuth)
    public async favoriteSongs(@Ctx() ctx: Context): Promise<Song[] | undefined> {
        if (!ctx.request.session!.userId) {
            return undefined;
        }

        return undefined;
    }
}
