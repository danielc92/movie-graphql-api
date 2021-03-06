import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm"
import { Director } from "./Director"
import { Actor } from "./Actor"
import { Movie } from "./Movie"

@Entity({ name: "country_tbl" })
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  countryName: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  // Relations

  @OneToMany((type) => Movie, (movie) => movie.country)
  movies: Movie[]

  @OneToMany((type) => Director, (director) => director.country)
  directors: Director[]

  @OneToMany((type) => Actor, (actor) => actor.country)
  actors: Actor[]
}
