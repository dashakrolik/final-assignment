import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { loadTicket, editTicket, loadTickets } from '../../actions/tickets'
import { getUsers } from '../../actions/users'
import TicketForm from './TicketForm'
import { createComment, loadSelectedComments, loadComments } from '../../actions/comments'
import CommentsForm from '../comments/CommentsForm'
import './TicketDetails.css'

class TicketDetails extends PureComponent{
 state = { edit: false }
  componentWillMount() {
    this.props.loadTicket(this.props.match.params.id)
    this.props.loadTickets()
    this.props.getUsers()
    this.props.loadSelectedComments(this.props.match.params.id) 
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

  createComment = (comment) => {
    comment.ticket = this.props.ticket
    this.props.createComment(comment)
  }
  
  //Start of code for risk
// * if the ticket is the only ticket of the author, add 10% ++


authorRisk = () => {
  const authorId = this.props.tickets.map(ticket => {
    return ticket.user.id
  })
  const authorTickets = authorId.filter(author => {
    return author = this.props.ticket.user.id
  }).length
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
  // 	* if a ticket is X% cheaper than the average price, add X% to the risk  * if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction
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
// if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
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

//End of code for risk
// As a customer I can see some color (red/yellow/green) indicating the fraud risk of a ticket for all tickets in the all tickets list

  render() {
    const { comments, ticket} = this.props 
    console.log(this.props.tickets)
      if (ticket) {
        return(
          <div>
            {
              this.props.currentUser &&
              this.state.edit &&
              <TicketForm initialValues={ticket} onSubmit={this.editTicket} />
            }
            { 
              !this.state.edit &&
            <div>
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
              <p>Seller email: {ticket.user.firstName}</p>
              <p>URL: {ticket.url}</p>
              <p>Description: {ticket.description}</p>
              <p>Ticket Id: {ticket.id}</p>
              <p>Price: {ticket.price}</p>
              <p>Date Created: {ticket.dateCreated}</p>
              <p style={this.riskColor(this.totalRisk())}>Risk of this ticket being fraudulent: {this.totalRisk()}%  </p>
            
              { this.props.currentUser && !this.state.edit &&
                  <button onClick={this.toggleEdit}>Edit ticket</button>
              }
            </div>
            }  
        
            
            <div>
              <br></br><br></br>
              <p>Comments</p>
                { comments.map(comment => (
                  <div>
                    <p>User email: {comment.user.email}</p>
                    <p>Comment: {comment.content}</p>
                  </div>)) 
                }  
            </div>

            {
              this.props.currentUser && 
                <div>
                  <p>Create a new comment</p>
                  <CommentsForm onSubmit={this.createComment} />
                </div>
            }
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>


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
    event: state.event,
    tickets: state.tickets,
    users: state.users,
    comments: state.comments
  }
}

export default connect(mapStateToProps, { loadTicket, editTicket, loadTickets, getUsers, createComment, loadSelectedComments, loadComments })(TicketDetails)
