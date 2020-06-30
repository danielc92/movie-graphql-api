import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError,
  GraphQLID,
} from "graphql"
import { getManager } from "typeorm"
import { Dummy } from "../entity/Dummy"
import { Movie } from "../entity/Movie"
import { DummyType, DummyPatchType } from "./Dummy"
import { MovieType, MovieInputType, MoviePatchType } from "./Movie"
import { CountryType, CountryInputType } from "./Country"
import { Country } from "../entity/Country"
import { DirectorType, DirectorInputType } from "./Director"
import { Director } from "../entity/Director"
import { ActorType, ActorInputType } from "./Actor"
import { Actor } from "../entity/Actor"
import { UserType, UserInputType, UserPatchType } from "./User"
import { User } from "../entity/User"
import { AwardType, AwardInputType } from "./Award"
import { Award } from "../entity/Award"
import * as bcrypt from "bcrypt"
import { ReviewType, ReviewInputType } from "./Review"
import { Review } from "../entity/Review"

const RootQuery = new GraphQLObjectType({
  description: "The root query.",
  name: "queries",
  fields: {
    // dummy: {
    //   type: DummyType,
    //   args: {
    //     id: { type: GraphQLInt },
    //   },
    //   resolve: async (parent, args) => {
    //     const repo = getManager().getRepository(Dummy)
    //     const data = await repo.findOne(args.id)
    //     return data
    //   },
    // },
    // dummies: {
    //   type: new GraphQLList(DummyType),
    //   args: {},
    //   resolve: async (parent, args) => {
    //     const repo = getManager().getRepository(Dummy)
    //     const data = await repo.find()
    //     return data
    //   },
    // },
    movies: {
      type: new GraphQLList(MovieType),
      args: {},
      resolve: async (parent, args) => {
        console.log(parent, args)
        const data = await getManager()
          .getRepository(Movie)
          .find({ relations: ["reviews"] })
        return data
      },
    },

    actors: {
      type: new GraphQLList(ActorType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(Actor).find()
        return data
      },
    },

    reviews: {
      type: new GraphQLList(ReviewType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager()
          .getRepository(Review)
          .find({
            relations: ["user", "movie"],
          })
        return data
      },
    },

    directors: {
      type: new GraphQLList(DirectorType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(Director).find()
        return data
      },
    },

    countries: {
      type: new GraphQLList(CountryType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(Country).find()
        return data
      },
    },

    users: {
      type: new GraphQLList(UserType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(User).find()
        return data
      },
    },

    awards: {
      type: new GraphQLList(AwardType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(Award).find()
        return data
      },
    },
  },
})

const RootMutation = new GraphQLObjectType({
  description: "The root mutation.",
  name: "mutations",
  fields: {
    // addDummy: {
    //   description: "Add a dummy to the database.",
    //   type: DummyType,
    //   args: {
    //     text: { type: new GraphQLNonNull(GraphQLInt) },
    //     nullableText: { type: GraphQLString },
    //   },
    //   resolve: async (parent, args) => {
    //     let data = new Dummy()
    //     data.text = args.text
    //     data.nullableText = args.nullableText
    //     return await getManager().save(data)
    //   },
    // },
    // patchDummy: {
    //   type: DummyType,
    //   description: "Update an existing dummy to the database.",
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLInt) },
    //     patch: { type: DummyPatchType },
    //   },
    //   resolve: async (parent, args) => {
    //     let repo = getManager().getRepository(Dummy)
    //     let item = await repo.findOne(args.id)

    //     Object.entries(args.patch).forEach((x) => {
    //       item[x[0]] = x[1]
    //     })

    //     return await getManager().save(item)
    //   },
    // },

    createReview: {
      type: ReviewType,
      description: "Create a new Review.",
      args: {
        patch: { type: ReviewInputType },
      },
      resolve: async (parent, args) => {
        let record = new Review()

        let user = await getManager()
          .getRepository(User)
          .findOne(args.patch.userId)
        if (!user) throw new GraphQLError("User not found")
        let movie = await getManager()
          .getRepository(Movie)
          .findOne(args.patch.movieId)
        if (!movie) throw new GraphQLError("Movie not found")
        record.user = user
        record.movie = movie
        record.reviewRating = args.patch.reviewRating
        record.reviewText = args.patch.reviewText
        const result = await getManager().save(record)
        return result
      },
    },

    createMovie: {
      type: MovieType,
      description: "Create a new Movie.",
      args: {
        patch: { type: MovieInputType },
      },
      resolve: async (parent, args) => {
        const record = new Movie()
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })

        const result = await getManager().save(record)
        return result
      },
    },

    updateMovie: {
      type: MovieType,
      description: "Update an existing Movie.",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        patch: { type: MoviePatchType },
      },
      resolve: async (parent, args) => {
        let record = await getManager().getRepository(Movie).findOne(args.id)
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })

        const result = await getManager().save(record)
        return result
      },
    },

    createActor: {
      type: ActorType,
      description: "Create a new Actor.",
      args: {
        patch: { type: ActorInputType },
      },
      resolve: async (parent, args) => {
        const record = new Actor()
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })

        const result = await getManager().save(record)
        return result
      },
    },

    createDirector: {
      type: DirectorType,
      description: "Create a new Director.",
      args: {
        patch: { type: DirectorInputType },
      },
      resolve: async (parent, args) => {
        const record = new Director()
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })

        const result = await getManager().save(record)
        return result
      },
    },

    createCountry: {
      type: CountryType,
      description: "Create a new Country.",
      args: {
        patch: { type: CountryInputType },
      },
      resolve: async (parent, args) => {
        const record = new Country()
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })

        const result = await getManager().save(record)
        return result
      },
    },

    createUser: {
      type: UserType,
      description: "Create a new User.",
      args: {
        patch: { type: UserInputType },
      },
      resolve: async (parent, args) => {
        const record = new User()
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })
        record.password = await bcrypt.hash(args.patch.password, 10)
        const result = await getManager().save(record)
        return result
      },
    },

    updateUser: {
      type: UserType,
      description: "Update an existing User",
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        patch: { type: UserPatchType },
      },
      resolve: async (parent, args) => {
        let record = await getManager().getRepository(User).findOne(args.id)
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })

        const result = await getManager().save(record)
        return result
      },
    },

    createAward: {
      type: AwardType,
      description: "Create a new Award.",
      args: {
        patch: { type: AwardInputType },
      },
      resolve: async (parent, args) => {
        const record = new Award()
        Object.entries(args.patch).forEach((x) => {
          record[x[0]] = x[1]
        })

        const result = await getManager().save(record)
        return result
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})

export default schema
