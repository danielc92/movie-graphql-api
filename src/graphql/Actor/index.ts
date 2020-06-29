import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from "graphql"

export const ActorType = new GraphQLObjectType({
  name: "Actor",
  description: "A actor type.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      actorFirstName: { type: GraphQLString },
      actorLastName: { type: GraphQLString },
      actorDob: { type: GraphQLString },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const ActorInputType = new GraphQLInputObjectType({
  name: "ActorInputType",
  description: "An actor input type.",
  fields: () => {
    return {
      actorFirstName: { type: new GraphQLNonNull(GraphQLString) },
      actorLastName: { type: new GraphQLNonNull(GraphQLString) },
      actorDob: { type: GraphQLString },
    }
  },
})
