import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'
import User from '../users/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 25)
  @Column('text')
  url: string

  @IsString()
  @MinLength(1)
  @Column('integer')
  price: number

  @IsString()
  @MinLength(10)
  @Column('text')
  description: string
  
  @ManyToOne(_ => User, user => user.tickets)
  user: User
}