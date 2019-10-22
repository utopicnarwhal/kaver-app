import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import SingerCollection, { ISinger } from "../models/singer";
import SongData, { ISong } from "../models/song";
import Singer from "../schemas/Singer";
import Song from "../schemas/Song";

@Resolver((of) => Singer)
export default class {
    @Query((returns) => Singer, { nullable: true })
    public async getSingerByName(@Arg("name") name: string): Promise<ISinger | null> {
        return (await SingerCollection.findOne({ name }));
    }

    @Query((returns) => [Song], { nullable: true })
    public async getSingerSongsByName(@Arg("name") name: string): Promise<ISong[] | null> {
        const singer = await this.getSingerByName(name);
        if (singer == null) {
            return [];
        }
        return (await SongData.find({ singerId: singer.id }));
    }
}
