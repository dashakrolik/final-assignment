import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  NotFoundError,
  Post,
  HttpCode, Authorized, CurrentUser
} from "routing-controllers";
import Ticket from "./entity";
import User from "../users/entity";

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

  @Get('/events/tickets/:event_id')
  async allOfTickets(
      @Param('event_id') id: number
  ) {
      const tickets = await Ticket.find({where: {event: id}})
      return { tickets }
  }

  @Authorized()
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
  async createTicket(
      @CurrentUser() user: User,
      @Body() ticket: Ticket
      ) {
          if(user instanceof User) ticket.user = user
          return ticket.save()
      }
}


  