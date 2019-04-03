import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loadEvent } from '../../actions/events';
import { getUsers } from '../../actions/users';
import { loadSelectedTickets, createTicket } from '../../actions/tickets'
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

  render() {
    const {tickets} = this.props
    const {event} = this.props
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
    users: state.users
  }
}

export default connect(mapStateToProps, { loadEvent , loadSelectedTickets, createTicket, getUsers })(EventDetails)