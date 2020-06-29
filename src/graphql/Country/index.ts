import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from "graphql"

export const CountryType = new GraphQLObjectType({
  name: "CountryType",
  description: "A country type.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      countryName: { type: GraphQLString },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const CountryInputType = new GraphQLInputObjectType({
  name: "CountryInputType",
  description: "A country input type.",
  fields: () => {
    return {
      countryName: { type: new GraphQLNonNull(GraphQLString) },
    }
  },
})
