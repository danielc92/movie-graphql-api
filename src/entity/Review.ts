import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"
import { Movie } from "./Movie"
import { User } from "./User"

@Entity({ name: "review_tbl" })
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  //movie
  @ManyToOne((type) => Movie, (movie) => movie.reviews)
  movie: Movie

  //user
  @ManyToOne((type) => User, (user) => user.reviews)
  user: User

  @Column()
  reviewText: string

  @Column()
  reviewRating: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}
