import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLScalarType,
} from "graphql"
import { MovieType } from "../Movie"

export const UserLoggedInSuccess = new GraphQLObjectType({
  name: "UserLoggedInSuccess",
  description: "A type for logged in user",
  fields: () => {
    return {
      token: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }
  },
})

export const UserLoggedInTry = new GraphQLInputObjectType({
  name: "UserLoggedInTry",
  description: "A type for logged in user",
  fields: () => {
    return {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }
  },
})

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
      movieWatchedList: { type: new GraphQLList(MovieType) },
      movieWishList: { type: new GraphQLList(MovieType) },
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
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
    }
  },
})
