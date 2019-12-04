import { Singer } from "./singer";
import { ObjectId } from "mongodb";
import { modelOptions, prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "songs" } })
export class Song {
    @Field()
    // tslint:disable-next-line: variable-name
    public _id?: ObjectId;

    @prop()
    @Field()
    public title: string;

    @Field()
    @prop()
    public href: string;

    @Field()
    @prop()
    public singerId?: ObjectId;

    @Field()
    @prop()
    public chordsAndText?: string;
}

export default getModelForClass(Song);
