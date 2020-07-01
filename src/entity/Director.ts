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

@Entity({ name: "director_tbl" })
export class Director {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  directorFirstName: string

  @Column()
  directorLastName: string

  @Column({ nullable: true })
  directorDob: Date

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  //Relations

  @ManyToMany((type) => Movie, (movie) => movie.directors)
  movies: Movie[]

  @ManyToOne((type) => Country, (country) => country.directors)
  country: Country
}
