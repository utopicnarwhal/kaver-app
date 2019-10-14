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

    const singers = Array<ISinger>();

    const ourSingers = await MyChordsService.retrieveAllSingersByType(SingersTypes.Our);
    if (ourSingers != null) {
        singers.push(...ourSingers);
    }
    console.log(`our singers: ${ourSingers.length}`);

    const foreignSingers = await MyChordsService.retrieveAllSingersByType(SingersTypes.Foreign);
    if (foreignSingers != null) {
        singers.push(...foreignSingers);
    }
    console.log(`foreign singers: ${foreignSingers.length}`);

    for (let i = 0; i < singers.length; ++i) {
        singers[i] = await Singer.create(singers[i]);

        console.log(`singer: ${singers[i]} saved`);
        const singerSongs = await MyChordsService.retrieveAllSongsBySinger(singers[i]);
        if (singerSongs == null || singerSongs.length < 1) {
            console.log(`no songs`);
        } else {
            console.log(`number of songs: ${singerSongs.length}`);
        }

        for (let j = 0; j < singerSongs.length; ++j) {
            singerSongs[j].chordsAndText = await MyChordsService.retrieveSongText(singerSongs[j].href);
            singerSongs[j] = await Song.create(singerSongs[j]);
            console.log(`song: ${singerSongs[j]} saved`);
        }
    }
    console.log("completed");
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});
