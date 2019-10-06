import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema/schema";

const port = 4000;

const app = express();

mongoose.connect("mongodb+srv://gigok:110796@kaver-claster-afbfy.gcp.mongodb.net/admin?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.connection.once("open", () => {
    console.log("connected to database");
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});
