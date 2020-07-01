import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLID,
} from "graphql"
import { MovieType } from "../Movie"

export const SoundtrackType = new GraphQLObjectType({
  name: "Soundtrack",
  description: "Represents a Soundtrack for a Movie.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      movie: { type: MovieType },
      soundtrackName: { type: GraphQLString },
      soundtrackComposedBy: { type: GraphQLString },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const SoundtrackInputType = new GraphQLInputObjectType({
  name: "SoundtrackInput",
  description: "Aids with creating a new Soundtrack.",
  fields: () => {
    return {
      movieId: { type: GraphQLID },
      soundtrackName: { type: GraphQLString },
      soundtrackComposedBy: { type: GraphQLString },
    }
  },
})
