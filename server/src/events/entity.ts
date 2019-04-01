// src/pages/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 25)
  @Column('text')
  name: string

  @IsString()
  @MinLength(10)
  @Column('text')
  description: string

  @IsString()
  @MinLength(10)
  @Column('text')
  url: string

  @CreateDateColumn({type:'date'})
  start: Date;

}



// Events have:

// * a name
// * a description
// * a picture or logo
// * a start and end date (could be the same)
