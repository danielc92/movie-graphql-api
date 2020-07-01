import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from "typeorm"
import { Review } from "./Review"
import { Award } from "./Award"
import { Actor } from "./Actor"
import { Director } from "./Director"
import { Country } from "./Country"
import { User } from "./User"
import { Quote } from "./Quote"
import { Soundtrack } from "./Soundtrack"

export enum MovieTypeEnum {
  TV_SERIES = "TV series",
  MOVIE = "Movie",
  OTHER = "Other",
}
export enum MovieGenreEnum {
  HORROR = "Horror",
  ADVENTURE = "Adventure",
  DRAMA = "Drama",
  THRILLER = "Thriller",
  COMEDY = "Comedy",
  ROMANCE = "Romance",
  DOCUMENTARY = "Documentary",
  ACTION = "Action",
  OTHER = "Other",
}
@Entity({ name: "movie_tbl" })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  movieTitle: string

  @Column()
  movieReleaseDate: Date

  @Column({
    type: "enum",
    enum: MovieGenreEnum,
    default: MovieGenreEnum.OTHER,
  })
  movieGenre: MovieGenreEnum

  @Column({
    type: "enum",
    enum: MovieTypeEnum,
    default: MovieTypeEnum.OTHER,
  })
  movieType: MovieTypeEnum

  @Column({ nullable: true })
  movieImageUrl: string

  @Column({ nullable: true })
  movieDurationMins: number

  @Column({ default: false })
  movieHasBluray: boolean

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  //Relations

  @ManyToOne((type) => Country, (country) => country.movies)
  country: Country

  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[]

  @OneToMany((type) => Quote, (quote) => quote.movie)
  quotes: Quote[]

  @OneToMany((type) => Soundtrack, (soundtrack) => soundtrack.movie)
  soundtracks: Soundtrack[]

  @ManyToMany((type) => Award, (award) => award.movies)
  @JoinTable()
  awards: Award[]

  @ManyToMany((type) => Actor, (actor) => actor.movies)
  @JoinTable()
  actors: Actor[]

  @ManyToMany((type) => Director, (director) => director.movies)
  @JoinTable()
  directors: Director[]

  @ManyToMany((type) => User, (user) => user.movieWatchedList)
  watchedByUsers: User[]

  @ManyToMany((type) => User, (user) => user.movieWishList)
  wishedByUsers: User[]
}
