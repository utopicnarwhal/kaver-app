import mongoose, { Document, Schema } from "mongoose";

export interface ISinger extends Document {
    name: string;
    href: string;
}

const SingerShema: Schema = new Schema({
    name: { type: String, required: true, unique: false },
    href: { type: String, required: true, unique: false },
});

export default mongoose.model<ISinger>("SingerCollection", SingerShema, "singers");
