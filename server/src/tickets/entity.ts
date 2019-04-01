import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'
import User from '../users/entity'
import Event from '../events/entity'
import Comment from '../comments/entity'

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

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  @OneToMany(_ => Comment, comment => comment.ticket)
  comments: Comment
}