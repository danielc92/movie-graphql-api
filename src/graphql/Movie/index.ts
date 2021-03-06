import { MovieGenreEnum, MovieTypeEnum } from "../../entity/Movie"
import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} from "graphql"
import { ReviewType } from "../Review"
import { ActorType } from "../Actor"
import { DirectorType } from "../Director"
import { AwardType } from "../Award"
import { SoundtrackType } from "../Soundtrack"
import { QuoteType } from "../Quote.ts"
import { CastType } from "../Cast"

export const MovieGenreEnumType = new GraphQLEnumType({
  name: "MovieGenreEnum",
  description: "Possible values for movie genre.",
  values: {
    HORROR: {
      value: MovieGenreEnum.HORROR,
    },
    ADVENTURE: {
      value: MovieGenreEnum.ADVENTURE,
    },
    DRAMA: {
      value: MovieGenreEnum.DRAMA,
    },
    THRILLER: {
      value: MovieGenreEnum.THRILLER,
    },
    COMEDY: { value: MovieGenreEnum.COMEDY },
    ROMANCE: {
      value: MovieGenreEnum.ROMANCE,
    },
    DOCUMENTARY: {
      value: MovieGenreEnum.DOCUMENTARY,
    },
    ACTION: {
      value: MovieGenreEnum.ACTION,
    },
    OTHER: {
      value: MovieGenreEnum.OTHER,
    },
  },
})

export const MovieTypeEnumType = new GraphQLEnumType({
  name: "MovieTypeEnum",
  description: "Possible values for movie type.",
  values: {
    TV_SERIES: {
      value: MovieTypeEnum.TV_SERIES,
    },
    MOVIE: {
      value: MovieTypeEnum.MOVIE,
    },
    OTHER: {
      value: MovieTypeEnum.OTHER,
    },
  },
})

export const MovieType = new GraphQLObjectType({
  name: "Movie",
  description: "Movie type",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      movieTitle: { type: GraphQLString },
      movieReleaseDate: { type: GraphQLFloat },
      movieGenre: { type: MovieGenreEnumType },
      movieType: { type: MovieTypeEnumType },
      movieImageUrl: { type: GraphQLString },
      movieDurationMins: { type: GraphQLInt },
      movieHasBluray: { type: GraphQLBoolean },
      reviews: { type: new GraphQLList(ReviewType) },
      awards: { type: new GraphQLList(AwardType) },
      directors: { type: new GraphQLList(DirectorType) },
      soundtracks: { type: new GraphQLList(SoundtrackType) },
      quotes: { type: new GraphQLList(QuoteType) },
      casts: { type: new GraphQLList(CastType) },
      createdAt: { type: GraphQLFloat },
      updatedAt: { type: GraphQLFloat },
    }
  },
})

export const MovieInputType = new GraphQLInputObjectType({
  name: "MovieInput",
  description: "Used to insert new movies.",
  fields: () => {
    return {
      movieTitle: { type: new GraphQLNonNull(GraphQLString) },
      movieReleaseDate: { type: new GraphQLNonNull(GraphQLString) },
      movieGenre: { type: new GraphQLNonNull(MovieGenreEnumType) },
      movieType: { type: new GraphQLNonNull(MovieTypeEnumType) },
      movieImageUrl: { type: GraphQLString },
      movieDurationMins: { type: GraphQLInt },
      movieHasBluray: { type: GraphQLBoolean },
    }
  },
})

export const MoviePatchType = new GraphQLInputObjectType({
  name: "MoviePatch",
  description: "Used to update existing movies.",
  fields: () => {
    return {
      movieTitle: { type: GraphQLString },
      movieReleaseDate: { type: GraphQLString },
      movieGenre: { type: MovieGenreEnumType },
      movieType: { type: MovieTypeEnumType },
      movieImageUrl: { type: GraphQLString },
      movieDurationMins: { type: GraphQLInt },
      movieHasBluray: { type: GraphQLBoolean },
    }
  },
})
