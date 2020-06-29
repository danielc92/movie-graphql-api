import {
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql"

export const DummyType = new GraphQLObjectType({
  name: "Dummy",
  description: "A dummy type for testing purposes.",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
      },
      text: {
        type: GraphQLString,
      },
      nullableText: {
        type: GraphQLString,
      },
      createdAt: {
        type: GraphQLFloat,
      },
      modifiedAt: {
        type: GraphQLFloat,
      },
    }
  },
})

export const DummyPatchType = new GraphQLInputObjectType({
  name: "DummyPatch",
  description: "A dummy patch type for testing purposes.",
  fields: () => {
    return {
      text: {
        type: new GraphQLNonNull(GraphQLString),
      },
      nullableText: {
        type: GraphQLString,
      },
    }
  },
})
