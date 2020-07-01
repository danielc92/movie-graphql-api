import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from "typeorm"
import { Movie } from "./Movie"

@Entity({ name: "quote_tbl" })
export class Quote {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quoteText: string

  @Column()
  quoteCastName: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  //relationships
  @ManyToOne((type) => Movie, (movie) => movie.quotes)
  movie: Movie
}
