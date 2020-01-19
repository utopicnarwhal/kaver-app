import { Arg, Query, Resolver, FieldResolver, Root } from "type-graphql";
import SongCollection, { Song } from "../models/song";
import SingerCollection, { Singer } from "../models/singer";

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

    @FieldResolver()
    @Query(() => Singer, { nullable: true })
    public async singer(@Root() rootSong: Song): Promise<Singer | null> {
        if (rootSong == null) {
            return null;
        }
        return (await SingerCollection.findById(rootSong?.singerId));
    }

    @Query(() => [Song], { nullable: true })
    public async searchSongByTitleSubstring(@Arg("substring") substring: string, @Arg("page") page: number = 0): Promise<Song[] | null> {
        return (await SongCollection.find({ title: new RegExp(`^.+ - .+${substring}.+$`, "i") }, null, { limit: 50, skip: page * 20 }));
    }
}
