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
    console.log(this.props.events)
    // As a customer I only want to see events that are not finished yet
    var MyDate = new Date();
    console.log(MyDate)
    var CurrenDateString;
    
    MyDate.setDate(MyDate.getDate());
    
    CurrenDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);

    console.log(CurrenDateString)

    const eventDate = this.props.events.map(event => event.start)
    const reducedEvents = eventDate.reduce((acc, value) => 
    
    acc + value, 0)

    console.log(eventDate)
    console.log(reducedEvents)

    return (
    <div>
      <br></br><br></br><br></br><br></br><br></br>
        <h1>Events</h1>
          { events.map(event => 
            (<div key={event.id}>
            <img src={event.url}/>
            <p><Link to={`/events/${event.id}`}>{event.name}</Link></p>
           </div>)) 
          } 
        { this.props.currentUser &&
        <div><h2>Add event</h2><EventForm onSubmit={this.createEvent} />
        </div>
        }
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