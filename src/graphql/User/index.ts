import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql"

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const UserPatchType = new GraphQLInputObjectType({
  name: "UserPatch",
  description: "A type to aid updating a User type.",
  fields: () => {
    return {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  description: "Used to create new users",
  fields: () => {
    return {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    }
  },
})
