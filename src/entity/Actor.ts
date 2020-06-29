import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

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

  //country

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}
