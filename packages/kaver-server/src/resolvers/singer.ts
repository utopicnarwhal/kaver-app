import { Arg, Query, Resolver } from "type-graphql";
import SingerCollection, { Singer } from "../models/singer";
import SongCollection, { Song } from "../models/song";

@Resolver()
export default class SingerResolvers {
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
        if (singer == null) {
            return [];
        }
        return (await SongCollection.find({ singerId: singer._id }));
    }
}
