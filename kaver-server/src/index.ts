import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import Environment from "./environment";
import Resolvers from "./resolvers/resolvers";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./schemas/scalars";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(
  `mongodb+srv://${Environment.login}:${Environment.password}@kaver-claster-afbfy.gcp.mongodb.net/kaver-db?retryWrites=true&w=majority`
);
mongoose.connection.once("open", async () => {
  console.log("connected to database");
});

const port = 4000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [Resolvers],
    emitSchemaFile: true,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
  });

  const server = new GraphQLServer({
    schema,
    context: ({ request, response }) => ({ request, response })
  });

  server.start((options) => {
    options.port = port;
    options.cors = {
      credentials: true,
      origin: ["http://localhost:3000"] // your frontend url.
    };
    console.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap();
