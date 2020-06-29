import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm"
import { Movie } from "./Movie"
import { User } from "./User"

@Entity()
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
