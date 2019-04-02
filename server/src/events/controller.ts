import {
    JsonController,
    Get,
    Param,
    Body,
    Post,
    HttpCode, Authorized, CurrentUser
  } from "routing-controllers";
  import Event from "./entity";
import User from "../users/entity";
  
  @JsonController()
  export default class EventsController {
    @Get('/events/:id')
    async getEvent(
      @Param('id') id: number
    ) {
      const event = await Event.findOne(id)
      return event
    }
  
    @Get('/events')
    async allEvents() {
      const events = await Event.find()
      return { events }
    }

  
    @Authorized()
    @Post('/events')
    @HttpCode(201)
    async createEvent(
        @CurrentUser() user: User,
        @Body() event: Event
        ) {
            if(user instanceof User) event.user = user
            return event.save()
        }


  }
  