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

  // IDEA: USE REDUCE EVERYWHERE TO ADJUST ALGORITHM< SHOULD WORK
  // if the ticket is the only ticket of the author, add 10%

//increment by 1
//to count the tickets
// numTicketsByAuthor will print smth like... {1: 15, 2: 4} [userId]: numberOfTickets
  authorsRisk = () => {
    const numTicketsByAuthor = this.props.tickets
    const value = numTicketsByAuthor.reduce((counts, ticket) => {
      counts[ticket.user.id] = (counts[ticket.user.id] || 0) + 1;
      return counts;
    }, {});
    let array = []
    console.log(value)
    array.push(value)
    console.log(array)
    // value = object with key of user id and a number of tickets for that user
    //ERRORING LINE BELOW
    // const numAuthorTickets = value[ticket.user.id];
    //   if (numAuthorTickets === 1) {
    //     return console.log(10);
    //   } else {
    //    return console.log(0);
      
    // }
    
  }

  // * if the ticket price is lower than the average ticket price for that event, that's a risk
  priceRisk = () => {
    const allTickets = this.props.tickets.length
    const oneTicketPrice = this.props.tickets.map(tickets => {
      return tickets.price
    })
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
  commentsRisk = () => {
  const numCommentsByTicket = this.props.tickets
  console.log(numCommentsByTicket)
  const value = numCommentsByTicket.reduce((counts, ticket) => {
    counts[ticket.comments.id] = (counts[ticket.comments.id] || 0) + 1;
    return counts;
  }, { counts: ''});
  let array = []
  console.log(value)
  array.push(value)
  console.log(array)
  }
  //ABOVE RETURNS NUMBER OF COMMENTS BUT WHAT NEXT, ALSO KEY IS UNDEFINED
  // commentRisk = () => {
  //   const allComments = this.props.tickets.map(tickets => {
  //     return tickets.comments.length
  //   })
  //   console.log(allComments)
  //   if (allComments > 3) {
  //     return 5
  //   } else {
  //     return 0
  //   }
  // }
  
  // if the ticket was added during business hours (9-17), 
  //deduct 10% from the risk, if not, add 10% to the risk
  dateRisk = () => {
    const dateCreated = this.props.tickets.map(tickets => {
      return console.log(tickets.dateCreated)
    })
    const hours = new Date(dateCreated)
    console.log(dateCreated)
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
  
    const risk = authorRisk + priceRisk + commentRisk
  
    if (risk < 5) {
      return 5
    } else if (risk > 95) {
      return 95
    } else {
      return risk
    }
  }
  
  //End of code for risk


  //To show color for risk on this page as well
  //Map over ticket, get data I need
  //Then calculate risk again
  render() {
    const {tickets} = this.props
    const {event} = this.props
 
const result = this.authorsRisk()
console.log(result)

// why error
const numTicketsByAuthor = this.props.tickets.reduce((counts, ticket) => {
  counts[ticket.user.id] = (counts[ticket.user.id] || 0) + 1;
  return counts;
}, []);

const authorRisk = (ticket, numTicketsByAuthor) => {
  const numAuthorTickets = numTicketsByAuthor[ticket.user.id];
  if (numAuthorTickets === 1) {
    return 10;
  } else {
   return 0;
  }
}

const date = this.dateRisk()
console.log(date)

const comments = this.commentsRisk()
console.log(comments)


    const {ticket} = this.props

    // const risky = this.totalRisk()
    // console.log(risky)
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
                <li>Risk: </li>
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