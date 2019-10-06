"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const selectionType = new graphql_1.GraphQLObjectType({
    fields: () => ({
        id: {
            type: graphql_1.GraphQLString
        }
    }),
    name: "cover",
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        cover: {
            type: selectionType,
            args: { id: { type: graphql_1.GraphQLString } }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
//# sourceMappingURL=schema.js.map