import { ObjectId } from "mongodb";
import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "singers" } })
export class Singer {
    @Field()
    // tslint:disable-next-line: variable-name
    public _id?: ObjectId;

    @Field()
    @prop()
    public name: string;

    @Field()
    @prop()
    public href: string;
}

export default getModelForClass(Singer);
