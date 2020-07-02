import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm"
import { Country } from "./Country"
import { Movie } from "./Movie"
import { Cast } from "./Cast"

@Entity({ name: "actor_tbl" })
export class Actor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  actorFirstName: string

  @Column()
  actorLastName: string

  @Column({ nullable: true })
  actorDob: Date

  @Column({ nullable: true })
  actorAvatarUrl: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  // Relations

  @OneToMany((type) => Cast, (cast) => cast.actor)
  casts: Cast[]

  @ManyToOne((type) => Country, (country) => country.actors)
  country: Country
}
