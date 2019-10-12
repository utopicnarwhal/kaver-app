import mongoose, { Schema } from "mongoose";

export default const singerSchema = new Schema({
    name: String,
    age: Number
});
