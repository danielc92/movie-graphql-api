import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql"
import { MovieType } from "../Movie"

export const QuoteType = new GraphQLObjectType({
  name: "Quote",
  description: "Represents a Quote for a Movie.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      quoteCastName: { type: GraphQLString },
      quoteText: { type: GraphQLString },
      movie: { type: MovieType },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const QuoteInputType = new GraphQLInputObjectType({
  name: "QuoteInput",
  description: "Aids with creating a new Quote.",
  fields: () => {
    return {
      movieId: { type: new GraphQLNonNull(GraphQLInt) },
      quoteCastName: { type: new GraphQLNonNull(GraphQLString) },
      quoteText: { type: new GraphQLNonNull(GraphQLString) },
    }
  },
})
