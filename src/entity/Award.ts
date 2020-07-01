import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm"
import { Movie } from "./Movie"

@Entity()
export class Award {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  awardName: string

  @Column()
  awardYear: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  // Relations
  @ManyToMany((type) => Movie, (movie) => movie.awards)
  movies: Movie[]
}
