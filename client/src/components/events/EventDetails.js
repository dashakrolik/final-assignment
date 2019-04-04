import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loadEvent } from '../../actions/events';
import { getUsers } from '../../actions/users';
import { loadSelectedTickets, createTicket, loadTicket } from '../../actions/tickets'
import TicketForm from '../tickets/TicketForm'

class EventDetails extends PureComponent{    
 state = {}
 
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id) 
    this.props.loadSelectedTickets(this.props.match.params.id)
    this.props.getUsers()
    console.log(this.props)
  }

  createTicket = (ticket) => {
    console.log("TICKET = ", ticket)
    ticket.event = this.props.event
    ticket.risk = this.totalRisk(ticket);
    this.props.createTicket(ticket)
    console.log('CREATED')
    this.state = ticket
    console.log(this.state)
  }


authorRisk = (ticket) => {
  const authorIds = ticket.event.tickets.map(ticket => {
    return ticket.user.id
  })
  const authorTickets = authorIds.filter(authorId => {
    return authorId == ticket.event.user.id
  }).length
  if (authorTickets === 1) {
    return 10 
  } else {
    return 0
  }
}
// * if the ticket price is lower than the average ticket price for that event, that's a risk
priceRisk = (ticket) => {
  const allTickets = ticket.event.tickets.length
  const oneTicketPrice = ticket.price
  const manyTicketsPrice = ticket.event.tickets.map(ticket => ticket.price)
  const total = manyTicketsPrice.reduce((acc, value) => acc + value, 0)
  const average = total / allTickets
  // 	* if a ticket is X% cheaper than the average price, add X% to the risk  * if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction
  // ((ticketPrice - average) / average) * 100
  const risk = (100 * oneTicketPrice / average - 100)
  if (risk < -10) {
    return -10
  } else {
    return risk
  }
}
// * if there are >3 comments on the ticket, add 5% to the risk
commentRisk = () => {
  const allComments = this.props.tickets.comments.length
  if (allComments > 3) {
    return 5
  } else {
    return 0
  }
}
// if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
dateRisk = (ticket) => {
  const dateCreated = ticket.dateCreated
  console.log(dateCreated)

  //changing UTC date to CET date
  const hours = new Date(dateCreated)
  const hours1 = hours.toLocaleString({ timeZone: 'CET'})
  //

  console.log(hours1)
  const newHours = hours.getHours()
  if (newHours >= 9 && newHours <= 17) {
    return -10
  } else {
    return 10
  }
}
// The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.
totalRisk = (ticket) => {
  //have base value for risk that is 5 percent?
  const authorRisk = this.authorRisk(ticket)
  const priceRisk = this.priceRisk(ticket)
  const dateRisk = this.dateRisk(ticket)

  const risk = authorRisk + priceRisk + dateRisk

  if (risk < 5) {
    return 5
  } else if (risk > 95) {
    return 95
  } else {
    return Math.round(risk)
  }
}

riskColor = (risk) => {
  if (risk < 30) {
    const color = {color: 'green'}
    return color
  } else if (risk >= 30) {
    const color = {color: 'red'}
    return color
  } else {
    const color = {color: 'orange'}
    return color
  }
}

  render() {
    const {tickets} = this.props
    const {event} = this.props
 
    // const result = this.authorsRisk()
    // console.log('authorsRisk:', result)

    // const price = this.priceRisk()
    // console.log('priceRisk:', price)

    // const date = this.dateRisk()
    // console.log('dateRisk:', date)

    // const comments = this.commentsRisk()
    // console.log('commentsRisk:', comments)

    const {ticket} = this.props

    if (event) {
      return (
        <div>
          <div>
            <p>Event: {event.name}</p>
            <p>{event.description}</p>
            <img src={event.url}/>
            <p>Starts on: {event.start}</p>
            <p>Ends on: {event.end}</p>
              <ul>
                <li key={event.name}>Event name: {event.name}</li>
                <li key={event.description}>Description: {event.description}</li>
              </ul>
            {tickets.map(ticket => (
              <ul>
                <li key={ticket.user.email}>{ticket.user.email}</li>
                <li key={ticket.price}>{ticket.price}</li>
                <li key={ticket.description}>{ticket.description}</li>
                <li key={ticket.id}>{ticket.dateCreated}</li>
                <img src={ticket.url}></img>
                <li>Risk:{ticket.risk}</li>
                <li><Link to={`/tickets/${ticket.id}`}>Ticket details</Link></li>
              </ul>))}
              {this.props.currentUser && <div>
                <p>Submit new ticket for sale</p>
                <TicketForm onSubmit={this.createTicket} />
                </div>}

          </div>
        </div>
        )} else {
          return (<div><p>Event does not exist</p></div>)
        }
      }
    }

const mapStateToProps = function (state) {
  return {
    event: state.event,
    tickets: state.tickets,
    currentUser: state.currentUser,
    users: state.users,
    ticket: state.ticket
  }
}

export default connect(mapStateToProps, { loadEvent , loadSelectedTickets, createTicket, getUsers, loadTicket })(EventDetails)