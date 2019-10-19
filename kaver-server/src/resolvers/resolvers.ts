import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import Singers, { ISinger } from "../models/singer";
import SongData, { ISong } from "../models/song";
import Singer from "../schemas/Singer";

@Resolver((of) => Singer)
export default class {
    @Query((returns) => Singer, { nullable: true })
    public async getSingerByName(@Arg("name") name: string): Promise<ISinger | null> {
        return (await Singers.findOne({ name }));
    }

    // @FieldResolver()
    // public async songs(@Root() singer: ISinger): Promise<ISong[] | null> {
    //     return (await SongData.find({ singerId: singer.id }));
    // }
}