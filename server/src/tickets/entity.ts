import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength } from 'class-validator'
import User from '../users/entity'
import Event from '../events/entity'
import Comment from '../comments/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { nullable: true })
  url: string

  @IsString()
  @MinLength(10)
  @Column('text')
  description: string

  @IsString()
  @MinLength(1)
  @Column('integer')
  price: number

  @Column('integer', { nullable: true })
  risk: number

  @CreateDateColumn({type: 'timestamp'})
  dateCreated: Date

  
  @ManyToOne(_ => User, user => user.tickets, {eager:true})
  user: User

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  @OneToMany(_ => Comment, comment => comment.ticket, {eager: true})
  comments: Comment[]
}