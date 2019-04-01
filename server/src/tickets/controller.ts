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
  import Ticket from "./entity";
  
  @JsonController()
  export default class TicketsControlelr {
    @Get('/tickets/:id')
    getTicket(
      @Param('id') id: number
    ) {
      return Ticket.findOne(id)
    }
  
    @Get('/tickets')
    async allTickets() {
      const tickets = await Ticket.find()
      return { tickets }
    }
  
    @Put('/tickets/:id')
    async updateTicket(
      @Param('id') id: number,
      @Body() update: Partial<Ticket>
    ) {
      const ticket = await Ticket.findOne(id)
      if (!ticket) throw new NotFoundError('Cannot find ticket')
  
      return Ticket.merge(ticket, update).save()
    }
  
    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
    createTicket(
      @Body() ticket: Ticket //put json data into the body of the page variable
    ) {
      return ticket.save()
    }
  }
  