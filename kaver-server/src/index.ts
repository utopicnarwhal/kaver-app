import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import Environment from "./environment";
import Singer, { ISinger } from "./models/singer";
import Song from "./models/song";
import schema from "./schema/schema";
import MyChordsService, { SingersTypes } from "./services/mychords-service";

const port = 4000;

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(`mongodb+srv://${Environment.login}:${Environment.password}@kaver-claster-afbfy.gcp.mongodb.net/kaver-db?retryWrites=true&w=majority`);
mongoose.connection.once("open", async () => {
    console.log("connected to database");

    
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});
