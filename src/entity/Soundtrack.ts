import {
  Entity,
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm"
import { Movie } from "./Movie"

@Entity({ name: "soundtrack_tbl" })
export class Soundtrack {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  soundtrackName: string

  @Column()
  soundtrackComposedBy: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  //relationships
  @ManyToOne((type) => Movie, (movie) => movie.soundtracks)
  movie: Movie
}
