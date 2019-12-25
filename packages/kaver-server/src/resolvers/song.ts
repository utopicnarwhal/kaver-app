import { Arg, Query, Resolver, UseMiddleware, Ctx } from "type-graphql";
import SongCollection, { Song } from "../models/song";
import { isAuth } from "../middleware/isAuth";
import { IContext } from "../models/context";

@Resolver()
export default class SongResolvers {
    @Query(() => Song, { nullable: true })
    public async getSongById(@Arg("id") id: string): Promise<Song | null> {
        return (await SongCollection.findById(id));
    }

    @Query(() => Song)
    @UseMiddleware(isAuth)
    public async favoriteSongs(@Ctx() ctx: IContext): Promise<Song[] | null> {
        if (!ctx.req) {
            return null;
        }

        return null;
    }

    @Query(() => [Song], { nullable: true })
    public async getRandomSongs(@Arg("size", { defaultValue: 10 }) size: number): Promise<Song[] | null> {
        return (await SongCollection.aggregate([{ $sample: { size } }]));
    }
}
