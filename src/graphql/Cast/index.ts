import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql"
import { MovieType } from "../Movie"
import { ActorType } from "../Actor"

export const CastType = new GraphQLObjectType({
  name: "Cast",
  description: "Represents a single Cast for a Movie",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      castFirstName: { type: GraphQLString },
      castLastName: { type: GraphQLString },
      castAvatarUrl: { type: GraphQLString },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
      actor: { type: ActorType },
      movie: { type: MovieType },
    }
  },
})

export const CastInputType = new GraphQLInputObjectType({
  name: "CastInput",
  description: "Aids with the creation of a new Cast.",
  fields: () => {
    return {
      castFirstName: { type: new GraphQLNonNull(GraphQLString) },
      castLastName: { type: new GraphQLNonNull(GraphQLString) },
      castAvatarUrl: { type: GraphQLString },
      actorId: { type: new GraphQLNonNull(GraphQLInt) },
      movieId: { type: new GraphQLNonNull(GraphQLInt) },
    }
  },
})
