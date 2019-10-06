import graphql, { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const selectionType = new GraphQLObjectType({
    fields: () => ({
        id: {
            type: GraphQLString
        }
    }),
    name: "cover",
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        cover: {
            type: selectionType,
            args: { id: { type: GraphQLString } }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});
