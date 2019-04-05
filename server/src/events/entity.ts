import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'
import Ticket from '../tickets/entity'
import User from '../users/entity';

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(3, 25)
  @Column('text')
  name: string

  @IsString()
  @MinLength(3)
  @Column('text')
  description: string

  @IsString()
  @MinLength(5)
  @Column('text')
  url: string

  @Column('date', {nullable:true})
  start: Date;

  @Column('date', {nullable:true})
  end: Date;

  @ManyToOne(_ => User, user => user.events, {eager:true})
  user: User

  @OneToMany(_ => Ticket, ticket => ticket.event, {eager:true})
  tickets: Ticket[];
}
