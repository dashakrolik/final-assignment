
const eventCreateSuccessReducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'EVENT_CREATE_SUCCESS':
    return action.event
    default:
    return state
  }
}

export default eventCreateSuccessReducer
