import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import Environment from "./environment";
import Resolves from "./resolvers/resolvers";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(`mongodb+srv://${Environment.login}:${Environment.password}@kaver-claster-afbfy.gcp.mongodb.net/kaver-db?retryWrites=true&w=majority`);
mongoose.connection.once("open", async () => {
    console.log("connected to database");
});

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [Resolves],
        emitSchemaFile: true,
    });

    const server = new GraphQLServer({
        schema,
    });

    server.start(() => console.log("Server is running on http://localhost:4000"));
}

bootstrap();
