import { Arg, Query, Resolver } from "type-graphql";
import SingerCollection, { Singer } from "../models/singer";
import SongCollection, { Song } from "../models/song";

@Resolver()
export default class SingerResolver {
    @Query(() => Singer, { nullable: true })
    public async getSingerById(@Arg("id") id: string): Promise<Singer | null> {
        return (await SingerCollection.findById(id));
    }

    @Query(() => Singer, { nullable: true })
    public async getSingerByName(@Arg("name") name: string): Promise<Singer | null> {
        return (await SingerCollection.findOne({ name }));
    }

    @Query(() => [Singer], { nullable: true })
    public async getRandomSingers(@Arg("size", { defaultValue: 10 }) size: number): Promise<Singer[] | null> {
        return (await SingerCollection.aggregate([{ $sample: { size } }]));
    }

    @Query(() => [Song], { nullable: true })
    public async getSingerSongsByName(@Arg("name") name: string): Promise<Song[] | null> {
        const singer = await this.getSingerByName(name);
        if (!singer) {
            return [];
        }
        return (await SongCollection.find({ singerId: singer._id }));
    }

    @Query(() => [Singer], { nullable: true })
    public async searchSingerByNameSubstring(@Arg("substring") substring: string, @Arg("page") page: number = 0): Promise<Singer[] | null> {
        return (await SingerCollection.find({ name: new RegExp(substring, "i") }, null, { limit: 50, skip: page * 20 }));
    }
}
