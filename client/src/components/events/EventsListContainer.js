// Passes props to EventDetails 

import React from 'react'
import {loadEvents} from '../../actions/events'
import {connect} from 'react-redux'
import EventsList from './EventsList'

class EventsListContainer extends React.Component {
  componentDidMount() {
    this.props.loadEvents()
  }

  render() {
      console.log('WOOOOOOOOOOOOOOOOOo')
    return (<div><h1>Amazing events</h1><EventsList events={this.props.events} /></div>)
  }
}

const mapStateToProps = state => ({
  events: state.eventsReducer
})

export default connect(mapStateToProps, {loadEvents})(EventsListContainer)