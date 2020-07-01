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
import { getManager, createQueryBuilder } from "typeorm"
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
      description: "Returns a list of Movies.",
      type: new GraphQLList(MovieType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager()
          .getRepository(Movie)
          .find({ relations: ["reviews", "awards", "directors", "actors"] })
        return data
      },
    },

    actors: {
      description: "Returns a list of Actors.",
      type: new GraphQLList(ActorType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(Actor).find()
        return data
      },
    },

    reviews: {
      description: "Returns a list of Reviews.",
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
      description: "Returns a list of Directors.",
      type: new GraphQLList(DirectorType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(Director).find()
        return data
      },
    },

    countries: {
      description: "Returns a list of Countries.",
      type: new GraphQLList(CountryType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager().getRepository(Country).find()
        return data
      },
    },

    users: {
      description: "Returns a list of Users.",
      type: new GraphQLList(UserType),
      args: {},
      resolve: async (parent, args) => {
        const data = await getManager()
          .getRepository(User)
          .find({ relations: ["movieWishList", "movieWatchedList"] })
        return data
      },
    },

    awards: {
      description: "Returns a list of Awards.",
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
      description: "Create a single Review.",
      type: ReviewType,
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
      description: "Create a single Movie.",
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
      description: "Create a single Actor.",
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
      description: "Create a single Director.",
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
      description: "Create a single Country.",
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
      description: "Create a single User.",
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

    addToWishList: {
      type: GraphQLString,
      description: "Add a Movie to User's movieWishList.",
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        movieId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const user = await getManager().getRepository(User).findOne(args.userId)
        if (!user)
          throw new Error("Couldnt find user, please check the is correct.")

        const movie = await getManager()
          .getRepository(Movie)
          .findOne(args.movieId)
        if (!movie)
          throw new Error("Couldnt find movie, please check the id is correct.")

        await createQueryBuilder()
          .relation(User, "movieWishList")
          .of(user)
          .add(movie)

        return "Successfully added movie to wishlist."
      },
    },
    addToWatchedList: {
      type: GraphQLString,
      description: "Add a Movie to User's movieWatchedList.",
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        movieId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const user = await getManager().getRepository(User).findOne(args.userId)
        if (!user)
          throw new Error("Couldnt find user, please check the is correct.")

        const movie = await getManager()
          .getRepository(Movie)
          .findOne(args.movieId)
        if (!movie)
          throw new Error("Couldnt find movie, please check the id is correct.")

        await createQueryBuilder()
          .relation(User, "movieWatchedList")
          .of(user)
          .add(movie)

        return "Successfully added movie to watchlist."
      },
    },

    linkMovieAward: {
      type: GraphQLString,
      description: "Associate an existing Award with an existing Movie",
      args: {
        movieId: { type: new GraphQLNonNull(GraphQLInt) },
        awardId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const movie = await getManager()
          .getRepository(Movie)
          .findOne(args.movieId)
        if (!movie)
          throw new Error("Couldnt find Movie, please check the id is correct.")

        const award = await getManager()
          .getRepository(Award)
          .findOne(args.awardId)
        if (!award)
          throw new Error("Couldnt find Award, please check the is correct.")

        await createQueryBuilder()
          .relation(Movie, "awards")
          .of(movie)
          .add(award)

        return "Successfully linked award to movie."
      },
    },
    createAward: {
      type: AwardType,
      description: "Create a single Award.",
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
