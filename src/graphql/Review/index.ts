import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
} from "graphql"

export const ReviewType = new GraphQLObjectType({
  name: "Review",
  description: "Represents a Movie review.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      movie: { type: GraphQLInt },
      user: { type: GraphQLInt },
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
  name: "Review",
  description: "A type to aid with the creation of a Review.",
  fields: () => {
    return {
      movie: { type: new GraphQLNonNull(GraphQLInt) },
      user: { type: new GraphQLNonNull(GraphQLInt) },
      reviewText: { type: GraphQLString },
      reviewRating: { type: GraphQLInt },
    }
  },
})
