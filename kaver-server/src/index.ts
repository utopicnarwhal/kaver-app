import axios from "axios";
import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import HTMLParser, { parse } from "node-html-parser";
import schema from "./schema/schema";
import Singer from "./models/singer";

const port = 4000;

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb+srv://gigok:110796@kaver-claster-afbfy.gcp.mongodb.net/admin?retryWrites=true&w=majority");
mongoose.connection.once("open", async () => {
    console.log("connected to database");

    let allOurSingersUrl = "https://mychords.net/nashi/page/1/";
    let response = await axios.get(allOurSingersUrl + "1/");

    let root = parse(response.data.toString()) as HTMLParser.HTMLElement;

    const paginatorChildNodes = root.querySelector(".b-pagination").childNodes;
    const numberOfPages = Number(paginatorChildNodes[paginatorChildNodes.length - 2]);

    const singers = Array<Singer>();

    for (let i = 1; i <= numberOfPages; ++i) {
        allOurSingersUrl = "https://mychords.net/nashi/page/";
        response = await axios.get(`${allOurSingersUrl}${i}/`);

        root = parse(response.data.toString()) as HTMLParser.HTMLElement;

        const allOurSingersOnPage = root.querySelectorAll(".b-listing-singers__item__name_m");

        const singersOnPage = allOurSingersOnPage.map((element) => {
            return {
                name: element.text.replace(/[\n\r\t]/g, ""),
                href: element.querySelector("a").attributes.href,
            };
        });

        singers.push(singersOnPage);
    }
    console.log(singers);
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});
