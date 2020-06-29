import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from "graphql"

export const DirectorType = new GraphQLObjectType({
  name: "DirectorType",
  description: "A director type.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      directorFirstName: { type: GraphQLString },
      directorLastName: { type: GraphQLString },
      directorDob: { type: GraphQLString },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const DirectorInputType = new GraphQLInputObjectType({
  name: "DirectorInputType",
  description: "An  director input type.",
  fields: () => {
    return {
      directorFirstName: { type: new GraphQLNonNull(GraphQLString) },
      directorLastName: { type: new GraphQLNonNull(GraphQLString) },
      directorDob: { type: GraphQLString },
    }
  },
})
