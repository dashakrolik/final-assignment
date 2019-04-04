import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loadEvent } from '../../actions/events';
import { getUsers } from '../../actions/users';
import { loadSelectedTickets, createTicket, loadTicket } from '../../actions/tickets'
import TicketForm from '../tickets/TicketForm'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import './EventsList.css'

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

  render() {
    const {tickets} = this.props
    const {event} = this.props
    const {ticket} = this.props

    if (event) {
      return (
        <div className="EventDetails">
          <Paper className="outer-paper" wrap="wrap">
          <div>
            <br></br><br></br>
            <img src={event.url}/>
            <p>Event name: {event.name}</p>
            <p>Description: {event.description}</p>
            <p>Starts on: {event.start}</p>
            <p>Ends on: {event.end}</p>

            {tickets.map(ticket => (
              <ul>
                <li key={ticket.user.email}>{ticket.user.email}</li>
                <li key={ticket.price}>{ticket.price}</li>
                <li key={ticket.description}>{ticket.description}</li>
                <li key={ticket.id}>{ticket.dateCreated}</li>
                <img src={ticket.url}></img>
                <li>Risk: </li>
                <li><Link to={`/tickets/${ticket.id}`}>Ticket details</Link></li>
              </ul>))}
              {this.props.currentUser && <div>
                <br></br>
                <p>Submit new ticket for sale</p>
                <TicketForm onSubmit={this.createTicket} />
                </div>}
          </div>
          </Paper>
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