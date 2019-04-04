import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length } from 'class-validator'
import User from '../users/entity'
import Ticket from '../tickets/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(3, 25)
  @Column('text')
  content: string

  @ManyToOne(_ => User, user => user.comments, {eager: true})
  user: User

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket
}


// When you click on a ticket, you see the details of that ticket (description/price) and which event it's for.
// On this page you can add comments as a customer, and everybody can see all the comments.

// A comment has a text and is connected to a specific ticket. It also has an author. 

// Anybody can view events and tickets, but you have to login to add a new ticket or comment. 
//Ltlle pizza poem
// Tomatoes and cheese on 
// dough is what a pizza is
//  dogs cats clouds boom
//   breakfast hohoho