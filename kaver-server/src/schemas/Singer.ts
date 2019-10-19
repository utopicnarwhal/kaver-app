import { Field, ObjectType } from "type-graphql";
import Song from "./Song";

@ObjectType()
export default class Singer {
    @Field()
    public id: number;

    @Field()
    public name: string;

    @Field()
    public href: string;

    @Field((type) => [Song])
    public songs: Song[];
}
