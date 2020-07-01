import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { Review } from "./Review"
import { Movie } from "./Movie"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  email: string

  @Column()
  password: string
  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  //Relations
  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[]

  @ManyToMany((type) => Movie, (movie) => movie.watchedByUsers)
  @JoinTable()
  movieWatchedList: Movie[]

  @ManyToMany((type) => Movie, (movie) => movie.wishedByUsers)
  @JoinTable()
  movieWishList: Movie[]
}
