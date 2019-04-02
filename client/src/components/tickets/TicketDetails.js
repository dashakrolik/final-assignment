import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { loadTicket, editTicket, loadTickets } from '../../actions/tickets'
import TicketForm from './TicketForm'

class TicketDetails extends PureComponent{
 state = { edit: false }
  componentDidMount() {
    this.props.loadTicket(this.props.match.params.id)
    this.props.loadTickets()
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  editTicket = (ticket) => {
        this.props.editTicket(this.props.match.params.id, ticket)
        this.toggleEdit()
    }
    

  render() {
    console.log('i mounted')
      const {ticket} = this.props 
      if (ticket) {
      return(
      <div>
      {
        this.props.currentUser &&
        this.state.edit &&
        <TicketForm values={ticket} onSubmit={this.updateTicket} />
        }
        {<div>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <p>User email: {ticket.user.firstName}</p>
          <p>URL: {ticket.url}</p>
          <p>Description: {ticket.description}</p>
          <p>Id: {ticket.id}</p>
          <p>Price: {ticket.price}</p>
          <p>Date: {ticket.dateCreated}</p>
          </div>
        }
        </div>
        )
      } else {
        return (<div><p>There is no such ticket</p></div>)
      }
    }
  } 

const mapStateToProps = function (state) {
  return {
    ticket: state.ticket,
    currentUser: state.currentUser,
    event: state.event
  }
}

export default connect(mapStateToProps, { loadTicket, editTicket, loadTickets })(TicketDetails)