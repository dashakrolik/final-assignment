import React from 'react'
import {connect} from 'react-redux'
import TicketDetails from './TicketDetails'

import {loadEvent, updateEvent, deleteEvent, loadTickets, loadTicket} from '../../actions/events'

class TicketDetailsContainer extends React.Component {
  state = { editMode: false }
  componentDidMount() {
    this.props.loadTicket(Number(this.props.match.params.id))
    this.props.loadTickets()
  }

  onDelete = () => {
    this.props.deleteEventonEdit(this.props.event.id)
    this.props.history.push('/')
  }



  onEdit = () => {
    console.log('i am button edit')
    this.setState({
      editMode: true,
      formValues: {
        name: this.props.event.name,
        date: this.props.event.date,
        description: this.props.event.description
      }
    })
  }

  onChange = (event) => {
    console.log('i am on change')
    // update the formValues property with the new data from the input field
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      }
    })
  }

  onSubmit = (event) => {
    console.log('I am onSubmit')
    event.preventDefault()
    this.setState({
      editMode: false
    })
    this.props.updateEvent(this.props.event.id, this.state.formValues)
  }

  render() {
    return (
      <div>
        <TicketDetails
          onDelete={this.onDelete}
          event={this.props.event}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onClick={this.onEdit}
          ourState={this.state.editMode}
          values={this.state.formValues}
          tickets={this.props.tickets} />
      </div>)

  }
}

const mapStateToProps = state => ({
  event: state.fetchedEvent,
  tickets: state.fetchedTickets
})

export default connect(mapStateToProps, {loadEvent, deleteEvent, updateEvent, loadTickets, loadTicket})(TicketDetailsContainer)