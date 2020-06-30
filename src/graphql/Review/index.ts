import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
} from "graphql"
import { MovieType } from "../Movie"
import { UserType } from "../User"

export const ReviewType = new GraphQLObjectType({
  name: "Review",
  description: "Represents a Movie review.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      movie: { type: MovieType },
      user: { type: UserType },
      reviewText: { type: GraphQLString },
      reviewRating: { type: GraphQLInt },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const ReviewPatchType = new GraphQLInputObjectType({
  name: "ReviewPatch",
  description: "A type to aid with the updating of Review.",
  fields: () => {
    return {
      reviewText: { type: GraphQLString },
      reviewRating: { type: GraphQLInt },
    }
  },
})

export const ReviewInputType = new GraphQLInputObjectType({
  name: "ReviewInput",
  description: "A type to aid with the creation of a Review.",
  fields: () => {
    return {
      movieId: { type: new GraphQLNonNull(GraphQLInt) },
      userId: { type: new GraphQLNonNull(GraphQLInt) },
      reviewText: { type: new GraphQLNonNull(GraphQLString) },
      reviewRating: { type: new GraphQLNonNull(GraphQLInt) },
    }
  },
})
