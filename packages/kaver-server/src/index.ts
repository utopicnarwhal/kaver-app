import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./schemas/scalars";
import { IContext } from "./models/context";
import cookieParser from "cookie-parser";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

async function connectToDB() {
  return mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@kaver-claster-afbfy.gcp.mongodb.net/kaver-db?retryWrites=true&w=majority`,
    (error) => {
      if (!error) {
        return;
      }
      console.log(error);
      connectToDB();
    }
  );
}

mongoose.connection.once("open", async () => {
  console.log("connected to database");
});

const port = 4000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: true,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
  });

  const server = new GraphQLServer({
    schema,
    context: ({ request, response }) => ({ req: request, res: response } as IContext),
  });

  server.use(cookieParser());

  server.start((options) => {
    options.port = port;
    console.log(`Server is running on http://localhost:${port}`);
  });
}

connectToDB();
bootstrap();
