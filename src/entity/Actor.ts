import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm"
import { Country } from "./Country"
import { Movie } from "./Movie"

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  actorFirstName: string

  @Column()
  actorLastName: string

  @Column({ nullable: true })
  actorDob: Date

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  // Relations

  @ManyToMany((type) => Movie, (movie) => movie.actors)
  movies: Movie[]

  @ManyToOne((type) => Country, (country) => country.actors)
  country: Country
}
