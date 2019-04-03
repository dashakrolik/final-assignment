import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loadEvent } from '../../actions/events';
import { getUsers } from '../../actions/users';
import { loadSelectedTickets, createTicket, loadTicket } from '../../actions/tickets'
import TicketForm from '../tickets/TicketForm'

class EventDetails extends PureComponent{    
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id) 
    this.props.loadSelectedTickets(this.props.match.params.id)
    this.props.getUsers()

  }

  createTicket = (ticket) => {
    ticket.event = this.props.event
    this.props.createTicket(ticket)
  }

  authorRisk = () => {
    const authorId = this.props.tickets.map(tickets => {
      return console.log(tickets)
    })
    const authorTickets = authorId.map(author => {
      return (console.log(author))
    }).length
    console.log(authorTickets)
    if (authorTickets === 1) {
      return 10 
    } else {
      return 0
    }
  }
  
  // * if the ticket price is lower than the average ticket price for that event, that's a risk
  priceRisk = () => {
    const allTickets = this.props.tickets.length
    const oneTicketPrice = this.props.ticket.price
    const manyTicketsPrice = this.props.tickets.map(ticket => ticket.price)
    const total = manyTicketsPrice.reduce((acc, value) => acc + value, 0)
    const average = total / allTickets
    // 	* if a ticket is X% cheaper than the average price, add X% to the risk 
  // 	* if a ticket is X% more expensive than the average price, 
  //deduct X% from the risk, with a maximum of 10% deduction
    const risk = (100 * oneTicketPrice / average - 100)
    if (risk < -10) {
      return -10
    } else {
      return risk
    }
  }
  
  
  // * if there are >3 comments on the ticket, add 5% to the risk
  commentRisk = () => {
    const allComments = this.props.comments.length
    if (allComments > 3) {
      return 5
    } else {
      return 0
    }
  }
  
  // if the ticket was added during business hours (9-17), 
  //deduct 10% from the risk, if not, add 10% to the risk
  dateRisk = () => {
    const dateCreated = this.props.ticket.dateCreated
    const hours = new Date(dateCreated)
    const newHours = hours.getHours()
    if (newHours >= 9 && newHours <= 17) {
      return -10
    } else {
      return 10
    }
  }
  
  
  // The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.
  totalRisk = () => {
    const authorRisk = this.authorRisk()
    const priceRisk = this.priceRisk()
    const commentRisk = this.commentRisk()
    const dateRisk = this.dateRisk()
  
    const risk = authorRisk + priceRisk + commentRisk + dateRisk
  
    if (risk < 5) {
      return 5
    } else if (risk > 95) {
      return 95
    } else {
      return Math.round(risk)
    }
  }
  
  //End of code for risk


  //To show color for risk on this page as well
  //Map over ticket, get data I need
  //Then calculate risk again
  render() {
    const {tickets} = this.props
    const {event} = this.props
 

   const riskAgain = () => {
    const ticketsObject = this.props.tickets.map(ticket => {
      return ticket
    })
    console.log(ticketsObject)
    }

    riskAgain()
    const {ticket} = this.props
    console.log(this.props)
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
                <li>Event name: {event.name}</li>
                <li>Description: {event.description}</li>
              </ul>
            {tickets.map(ticket => (
              <ul>
                <li>{ticket.user.email}</li>
                <li>{ticket.price}</li>
                <li>{ticket.description}</li>
                <li>{ticket.dateCreated}</li>
                <li>Risk: {this.totalRisk()}</li>
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
    // As a customer I can see some color (red/yellow/green) indicating the fraud risk of a ticket for all tickets in the all tickets list
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