import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { loadEvents, createEvent } from '../../actions/events';
import { Link } from 'react-router-dom';
import EventForm from './EventForm';
import { getUsers } from '../../actions/users';

class EventsList extends PureComponent{
  createEvent = (event) => {
    this.props.createEvent(event)
  }
  componentWillMount() {
    this.props.loadEvents()
    this.props.getUsers()
  }
  
  render() {
    const {events} = this.props 
    return (
    <div>
      <br></br><br></br><br></br><br></br><br></br>
        <h1>Events</h1>
          { events.map(event => 
            (<div key={event.id}>
            <img src={event.url}/>
            <p><Link to={`/events/${event.id}`}>{event.name}</Link></p>
           </div>)) } 
        {<div><h1>Add event</h1><EventForm onSubmit={this.createEvent} /></div>}
      <br></br><br></br><br></br><br></br><br></br>
    </div>
    )
  }
} 

const mapStateToProps = function (state) {
  return {
    events: state.events,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { loadEvents, createEvent, getUsers })(EventsList)