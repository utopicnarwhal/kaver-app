"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = __importDefault(require("./schema/schema"));
const port = 4000;
const app = express_1.default();
mongoose_1.default.connect("mongodb+srv://gigok:110796@kaver-claster-afbfy.gcp.mongodb.net/admin?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose_1.default.connection.once("open", () => {
    console.log("connected to database");
});
app.use("/graphql", express_graphql_1.default({
    schema: schema_1.default,
    graphiql: true,
}));
app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});
//# sourceMappingURL=index.js.map