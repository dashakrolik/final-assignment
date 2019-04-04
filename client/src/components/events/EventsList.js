import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { loadEvents, createEvent } from '../../actions/events';
import { Link } from 'react-router-dom';
import EventForm from './EventForm';
import { getUsers } from '../../actions/users';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


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
    <div>
      <Typography  variant="eventsList" align="center" color="inherit" style={{flex: 1}}></Typography>
      <br></br><br></br><br></br><br></br><br></br>
        <h1>Events</h1>
          { 
            this.state.map(event => 
            (<div key={event.id}>
            <img src={event.url}/>
            <p><Link to={`/events/${event.id}`}>{event.name}</Link></p>
            </div>)) 
          } 
          { 
          this.props.currentUser &&
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