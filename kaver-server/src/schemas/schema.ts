import { Field, Int, ObjectType } from "type-graphql";
import Singer from "../models/singer";
import Song from "../models/song";

@ObjectType()
export default class SongType {
    @Field((type) => Int)
    public id: number;

    @Field()
    public name: string;

    @Field((type) => String)
    public singerId: string;
}
