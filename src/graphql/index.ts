import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLError,
} from "graphql"
import { getManager } from "typeorm"
import { Dummy } from "../entity/Dummy"
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"

const DummyType = new GraphQLObjectType({
  name: "Dummy",
  description: "A dummy type for testing purposes.",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
      },
      text: {
        type: GraphQLString,
      },
      nullableText: {
        type: GraphQLString,
      },
      createdAt: {
        type: GraphQLFloat,
      },
      modifiedAt: {
        type: GraphQLFloat,
      },
    }
  },
})

const DummyPatchType = new GraphQLInputObjectType({
  name: "DummyPatch",
  description: "A dummy patch type for testing purposes.",
  fields: () => {
    return {
      text: {
        type: new GraphQLNonNull(GraphQLString),
      },
      nullableText: {
        type: GraphQLString,
      },
    }
  },
})

const RootQuery = new GraphQLObjectType({
  description: "The root query.",
  name: "queries",
  fields: {
    dummy: {
      type: DummyType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const repo = getManager().getRepository(Dummy)
        const data = await repo.findOne(args.id)
        return data
      },
    },
    dummies: {
      type: new GraphQLList(DummyType),
      args: {},
      resolve: async (parent, args) => {
        const repo = getManager().getRepository(Dummy)
        const data = await repo.find()
        return data
      },
    },
  },
})

const RootMutation = new GraphQLObjectType({
  description: "The root mutation.",
  name: "mutations",
  fields: {
    addDummy: {
      description: "Add a dummy to the database.",
      type: DummyType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLInt) },
        nullableText: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let data = new Dummy()
        data.text = args.text
        data.nullableText = args.nullableText
        return await getManager().save(data)
      },
    },
    patchDummy: {
      type: DummyType,
      description: "Update an existing dummy to the database.",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        patch: { type: DummyPatchType },
      },
      resolve: async (parent, args) => {
        let repo = getManager().getRepository(Dummy)
        let item = await repo.findOne(args.id)

        Object.entries(args.patch).forEach((x) => {
          item[x[0]] = x[1]
        })

        return await getManager().save(item)
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})

export default schema
