import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

export enum MovieTypeEnum {
  TV_SERIES = "TV series",
  MOVIE = "Movie",
  OTHER = "Other",
}
export enum MovieGenreEnum {
  HORROR = "Horror",
  THRILLER = "Thriller",
  COMEDY = "Comedy",
  ROMANCE = "Romance",
  DOCUMENTARY = "Documentary",
  ACTION = "Action",
  OTHER = "Other",
}
@Entity()
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
}
