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

    //Compare the array of dates to currentdate
    const dateComparison = () => {
      let array = this.props.events.map(event => event.end)
      console.log(array)
      let MyDate = new Date();
      let CurrenDateString;
      MyDate.setDate(MyDate.getDate());
      CurrenDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
      console.log(CurrenDateString)
      let value1 = CurrenDateString;  //compare to current date
      let value2 = "2019-04-05";  //is in array

      function isInArray(array, value) {
      return (array.find(item => {return item === value}) || []).length > 0;
}

//if the current date is in the array of end dates for events then that would mean the
//event finishes today, which means the event is not current anymore => do not show the event if currentdate
// is inside of the array
// so if isInArray returns true do not show that event
// if returns false show the event

console.log(isInArray(array, value1));
console.log(isInArray(array, value2));
    }
    
    const returnCurrentEvents = () => {
      let MyDate = new Date();
      let CurrenDateString;
      MyDate.setDate(MyDate.getDate());
      CurrenDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
      if (!dateComparison()) {
        const currentEvents =  this.props.events.filter(event => event.end !== CurrenDateString)
        return console.log(currentEvents)
      }
    }
    returnCurrentEvents()
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