import {
    JsonController,
    Get,
    Param,
    Put,
    Body,
    NotFoundError,
    Post,
    HttpCode, Authorized
  } from "routing-controllers";
  import Event from "./entity";
  
  @JsonController()
  export default class EventsController {
    @Get('/events/:id')
    getEvent(
      @Param('id') id: number
    ) {
      return Event.findOne(id)
    }
  
    @Get('/events')
    async allEvents() {
      const events = await Event.find()
      return { events }
    }
  
    @Put('/events/:id')
    async updatePage(
      @Param('id') id: number,
      @Body() update: Partial<Event>
    ) {
      const event = await Event.findOne(id)
      if (!event) throw new NotFoundError('Cannot find event')
  
      return Event.merge(event, update).save()
    }
  
    @Authorized()
    @Post('/events')
    @HttpCode(201)
    createEvent(
      @Body() event: Event //put json data into the body of the page variable
    ) {
      return event.save()
    }
  }
  