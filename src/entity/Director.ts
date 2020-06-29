import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Director {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  directorFirstName: string

  @Column()
  directorLastName: string

  @Column({ nullable: true })
  directorDob: Date

  //country

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}
