import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { loadTicket, editTicket, loadTickets } from '../../actions/tickets'
import { getUsers } from '../../actions/users'
import TicketForm from './TicketForm'
import { createComment, loadSelectedComments, loadComments } from '../../actions/comments'
import CommentsForm from '../comments/CommentsForm'
import './TicketDetails.css'
import Paper from '@material-ui/core/Paper'

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

  priceRisk = () => {
    const allTickets = this.props.tickets.length
    const oneTicketPrice = this.props.ticket.price
    const manyTicketsPrice = this.props.tickets.map(ticket => ticket.price)
    const total = manyTicketsPrice.reduce((acc, value) => acc + value, 0)
    const average = total / allTickets
    const risk = (100 * oneTicketPrice / average - 100)
    if (risk < -10) {
      return -10
    } else {
      return risk
    }
  }

  commentRisk = () => {
    const allComments = this.props.comments.length
    if (allComments > 3) {
      return 5
    } else {
      return 0
    }
  }

  dateRisk = () => {
    const dateCreated = this.props.ticket.dateCreated
    const hours = new Date(dateCreated)
    const hours1 = hours.toLocaleString({ timeZone: 'CET'})
  
    const newHours = hours.getHours()
    if (newHours >= 9 && newHours <= 17) {
      return -10
    } else {
      return 10
    }
  }

  totalRisk = () => {
    let baseRisk = 5
    const authorRisk = this.authorRisk()
    const priceRisk = this.priceRisk()
    const commentRisk = this.commentRisk()
    const dateRisk = this.dateRisk()
    const risk = baseRisk + authorRisk + priceRisk + commentRisk + dateRisk

    if (risk < 5) {
      return 5
    } else if (risk > 95) {
      return 95
    } else {
      return Math.round(baseRisk)
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
    const { comments, ticket} = this.props 
      if (ticket) {
        return(
          <div>
            <Paper className="outer-paper" wrap="wrap">
            {
              this.props.currentUser &&
              this.state.edit &&
              <TicketForm initialValues={ticket} onSubmit={this.editTicket} />
            }
            { 
              !this.state.edit &&
              <div className="TicketDetailsContent">
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <p>Seller name: {ticket.user.firstName}</p>
                  <p>Seller email: {ticket.user.email}</p>
                  <p>Description: {ticket.description}</p>
                  <p>Ticket Id: {ticket.id}</p>
                  <p>Price: {ticket.price}</p>
                  <p>Date Created: {ticket.dateCreated}</p>
                  <p style={this.riskColor(this.totalRisk())}>Risk of this ticket being fraudulent: {this.totalRisk()}%  </p>
                  <img src={ticket.url}></img>
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
              <br></br><br></br>
              </Paper>
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
