import mongoose, { Document, Schema } from "mongoose";
import { ISinger } from "./singer";

export interface ISong extends Document {
    singerId?: ISinger["_id"];
    title: string;
    href: string;
    chordsAndText?: string;
}

const SongShema: Schema = new Schema({
    singerId: { type: Schema.Types.ObjectId, required: false, unique: false },
    title: { type: String, required: true, unique: false },
    href: { type: String, required: true, unique: false },
    chordsAndText: { type: String, required: false, unique: false, index: false },
});

export default mongoose.model<ISong>("ISong", SongShema);
