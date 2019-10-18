import graphql, { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { resolve } from "url";

const selectionType = new GraphQLObjectType({
    name: "cover",
    fields: () => ({
        id: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        cover: {
            type: selectionType,
            args: { id: { type: GraphQLString } },
            resolve() {
                return {id: "asdf"};
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});
