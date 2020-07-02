import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
} from "graphql"
import { CountryType } from "../Country"
import { CastType } from "../Cast"

export const ActorType = new GraphQLObjectType({
  name: "Actor",
  description: "A actor type.",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      actorFirstName: { type: GraphQLString },
      actorLastName: { type: GraphQLString },
      actorAvatarUrl: { type: GraphQLString },
      actorDob: { type: GraphQLString },
      casts: { type: new GraphQLList(CastType) },
      country: { type: CountryType },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const ActorInputType = new GraphQLInputObjectType({
  name: "ActorInputType",
  description: "An actor input type.",
  fields: () => {
    return {
      actorFirstName: { type: new GraphQLNonNull(GraphQLString) },
      actorLastName: { type: new GraphQLNonNull(GraphQLString) },
      actorAvatarUrl: { type: GraphQLString },
      actorDob: { type: GraphQLString },
      countryId: { type: new GraphQLNonNull(GraphQLInt) },
    }
  },
})
