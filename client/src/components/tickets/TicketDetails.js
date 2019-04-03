import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { loadTicket, editTicket, loadTickets } from '../../actions/tickets'
import { getUsers } from '../../actions/users'
import TicketForm from './TicketForm'
import { createComment, loadSelectedComments, loadComments } from '../../actions/comments'
import CommentsForm from '../comments/CommentsForm'

class TicketDetails extends PureComponent{
 state = { edit: false }
  componentWillMount() {
    this.props.loadTicket(this.props.match.params.id)
    this.props.loadTickets()
    this.props.getUsers()
    this.props.loadSelectedComments(this.props.match.params.id) 
  }

  componentDidMount() {
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
}











  //End of code for risk


  render() {
   const commentRisk = () => {
      const allComments = this.props.comments.length
      if (allComments > 3) {
        return console.log(5) 
      } else {
        return console.log(0)
      }
    }

  commentRisk()
     





    const { comments, ticket} = this.props 
    console.log('i mounted')
    console.log('props', this.props.tickets)
      if (ticket) {
        return(
          <div>
            {
              this.props.currentUser &&
              this.state.edit &&
            <TicketForm values={ticket} onSubmit={this.updateTicket} />
            }
            {
            <div>
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
              <p>Seller email: {ticket.user.firstName}</p>
              <p>URL: {ticket.url}</p>
              <p>Description: {ticket.description}</p>
              <p>Id: {ticket.id}</p>
              <p>Price: {ticket.price}</p>
              <p>Date: {ticket.dateCreated}</p>
              <p>Risk:</p>
            </div>
            }  
        
            
            <div>
              <br></br><br></br>
              <p>Comments</p>
                { comments.map(comment => (
            <div>
              <p>User email: {comment.user.email}</p>
              <p>Comment: {comment.content}</p>
            </div>)) }  
        </div>

        {
         this.props.currentUser && 
         <div>
           <p>Create a new comment</p>
           <CommentsForm onSubmit={this.createComment} />
         </div>
        }


        <CommentsForm onSubmit={this.createComment} />
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

// ## !! Fraud risk algorithm !!

// _This is an important part of the assignment. If you only finish one thing, it should be this thing!_

// Tickets can be fraudulent, and as a customer I don't want to buy a fake ticket! So, we want to show customers the risk that they are taking when buying the ticket. 

// On the ticket page for a specific ticket, we want to show a text like:

// > "We calculated that the risk of this ticket being a fraud is XX%"

// The percentage should be calculated using the following algorithm:

// * if the ticket is the only ticket of the author, add 10%
// * if the ticket price is lower than the average ticket price for that event, that's a risk
// 	* if a ticket is X% cheaper than the average price, add X% to the risk 
// 	* if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction
// * if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
// * if there are >3 comments on the ticket, add 5% to the risk

// The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.

// The calculated risk of a ticket depends on many factors. Make sure that the risk value is always "live" (i.e. up to date)