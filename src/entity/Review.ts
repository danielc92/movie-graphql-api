import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  //movie

  //user

  @Column()
  reviewText: string

  @Column()
  reviewRating: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string
}
