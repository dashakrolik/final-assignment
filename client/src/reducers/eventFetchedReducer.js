const eventFetchedReducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'EVENT_FETCHED':
    return action.event
    case 'EVENT_UPDATE':
    return action.event
    default:
    return state
  }
}

export default eventFetchedReducer
