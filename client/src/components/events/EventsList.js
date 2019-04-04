import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { loadEvents, createEvent } from '../../actions/events';
import { Link } from 'react-router-dom';
import EventForm from './EventForm';
import { getUsers } from '../../actions/users';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import './EventsList.css'

class EventsList extends PureComponent{
  createEvent = (event) => {
    this.props.createEvent(event)
  }
  componentWillMount() {
    this.props.loadEvents()
    this.props.getUsers()
  }
  state = {}

  //only return current events
  returnCurrentEvents = () => {
    let MyDate = new Date();
    let CurrenDateString;
    MyDate.setDate(MyDate.getDate());
    CurrenDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
    const currentEvents =  this.props.events.filter(event => event.end !== CurrenDateString)
    return currentEvents
  }
  
  render() {
    const {events} = this.props 
    this.state = this.returnCurrentEvents()
 
    return (
    <div className="EventsList">
      <Paper className="outer-paper" wrap="wrap">
      <br></br>
        <h1>Events</h1>
          { 
            this.state.map(event => 
            (<div key={event.id} className="EventsListImageAndLink">
            <img src={event.url}/>
            <span><Link to={`/events/${event.id}`}>{event.name}</Link></span>
            </div>)) 
          } 
          { 
          this.props.currentUser &&
          <div className="EventForm"><h1>Add event</h1><EventForm onSubmit={this.createEvent} />
          </div>
        }
      <br></br><br></br><br></br><br></br><br></br>
      </Paper>
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