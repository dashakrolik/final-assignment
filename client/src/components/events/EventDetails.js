import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loadEvent } from '../../actions/events';
import { loadSelectedTcikets, createTicket } from '../../actions/tickets'
import TicketForm from '../tickets/TicketForm'

class EventDetails extends PureComponent{    
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id) 
    this.props.loadSelectedTcikets(this.props.match.params.id)
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
            <p>Starts on: {event.dateCreated}</p>
              <ul>
                <li>Seller email</li>
                <li>Price</li>
                <li>Description</li>
                <li>Date</li>
                <li>Link</li>
              </ul>
            { tickets.map(ticket => (
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
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { loadEvent , loadSelectedTcikets, createTicket })(EventDetails)