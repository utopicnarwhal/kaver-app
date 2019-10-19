import { Field, ObjectType } from "type-graphql";
import Singer from "./Singer";

@ObjectType()
export default class Song {
    @Field()
    public id: string;

    @Field()
    public title: string;

    @Field()
    public href: string;

    @Field()
    public chordsAndText: string;

    @Field((type) => Singer)
    public singer: Singer;
}
    
