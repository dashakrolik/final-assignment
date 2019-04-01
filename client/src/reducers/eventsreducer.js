const eventsReducer = (state = null, action = {}) => {
  switch (action.type) {
  case 'EVENTS_FETCHED':
    return action.events
  case 'EVENT_CREATE_SUCCESS':
    return state.concat(action.event)
  case 'EVENT_DELETE_SUCCESS':
    return state.filter(event =>
      event.id !== action.id
      )
  case 'TICKETS_FETCHED':
      return action.tickets
    default:
      return state
  }
}

export default eventsReducer

