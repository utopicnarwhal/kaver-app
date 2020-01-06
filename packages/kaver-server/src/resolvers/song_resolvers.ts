import { Arg, Query, Resolver } from "type-graphql";
import SongCollection, { Song } from "../models/song";

@Resolver(() => Song)
export default class SongResolver {
    @Query(() => Song, { nullable: true })
    public async getSongById(@Arg("id") id: string): Promise<Song | null> {
        return (await SongCollection.findById(id));
    }

    @Query(() => [Song], { nullable: true })
    public async getRandomSongs(@Arg("size", { defaultValue: 10 }) size: number): Promise<Song[] | null> {
        return (await SongCollection.aggregate([{ $sample: { size } }]));
    }
}
