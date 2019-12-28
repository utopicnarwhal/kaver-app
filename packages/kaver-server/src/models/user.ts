import { ObjectId } from "mongodb";
import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { Song } from "./song";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "users" } })
export class User {
    @Field()
    // tslint:disable-next-line: variable-name
    public _id?: ObjectId;

    @Field()
    @prop()
    public firstname: string;

    @Field()
    @prop()
    public lastname: string;

    @Field()
    @prop()
    public password?: string;

    @Field()
    @prop()
    public username?: string;

    @Field(() => [Song])
    public favoriteSongs?: [Song];
}

export default getModelForClass(User);
