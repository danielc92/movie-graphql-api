import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity({ name: "dummy_tbl" })
export class Dummy {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({
    nullable: true,
  })
  nullableText: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  modifiedAt: Date
}
