import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql"

export const AwardType = new GraphQLObjectType({
  name: "Award",
  description: "An award associated with movies",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      awardName: { type: GraphQLString },
      awardYear: { type: GraphQLInt },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const AwardInputType = new GraphQLInputObjectType({
  name: "AwardInput",
  description: "Used to create a new Award",
  fields: () => {
    return {
      awardName: { type: new GraphQLNonNull(GraphQLString) },
      awardYear: { type: new GraphQLNonNull(GraphQLInt) },
    }
  },
})
