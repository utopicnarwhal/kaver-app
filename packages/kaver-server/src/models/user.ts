import { ObjectId } from "mongodb";
import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

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
}

export default getModelForClass(User);
