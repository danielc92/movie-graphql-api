import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"
import { Movie } from "./Movie"
import { Actor } from "./Actor"

@Entity({ name: "cast_tbl" })
export class Cast {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  castFirstName: string

  @Column()
  castLastName: string

  @Column({ nullable: true })
  castAvatarUrl: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  // Relations

  @ManyToOne((type) => Actor, (actor) => actor.casts)
  actor: Actor

  @ManyToOne((type) => Movie, (movie) => movie.casts)
  movie: Movie
}
