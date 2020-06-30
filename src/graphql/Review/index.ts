import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType,
} from "graphql"
import { MovieType } from "../Movie"
import { UserType } from "../User"

export const ReviewRatingEnum = new GraphQLEnumType({
  name: "ReviewRatingEnum",
  description: "List of allowed values for a Review rating",
  values: {
    ONE_OUT_OF_TEN: {
      value: 1,
    },
    TWO_OUT_OF_TEN: {
      value: 2,
    },
    THREE_OUT_OF_TEN: {
      value: 3,
    },
    FOUR_OUT_OF_TEN: {
      value: 4,
    },
    FIVE_OUT_OF_TEN: {
      value: 5,
    },
    SIX_OUT_OF_TEN: {
      value: 6,
    },
    SEVEN_OUT_OF_TEN: {
      value: 7,
    },
    EIGHT_OUT_OF_TEN: {
      value: 8,
    },
    NINE_OUT_OF_TEN: {
      value: 9,
    },
    TEN_OUT_OF_TEN: {
      value: 10,
    },
  },
})
export const ReviewType = new GraphQLObjectType({
  name: "Review",
  description: "Represents a Movie review.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      movie: { type: MovieType },
      user: { type: UserType },
      reviewText: { type: GraphQLString },
      reviewRating: { type: ReviewRatingEnum },
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
      reviewRating: { type: ReviewRatingEnum },
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
      reviewRating: { type: new GraphQLNonNull(ReviewRatingEnum) },
    }
  },
})
