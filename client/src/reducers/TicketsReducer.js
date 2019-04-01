const ticketsReducer = (state = null, action = {}) => {
    switch (action.type) {
    case 'TICKETS_FETCHED':
        return action.tickets
      default:
        return state
    }
  }
  
  export default ticketsReducer
  
  