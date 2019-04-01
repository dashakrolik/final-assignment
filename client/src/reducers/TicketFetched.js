const ticketFetched = (state = [], action = {}) => {
    switch (action.type) {
      case 'TICKET_FETCHED':
      return action.ticket
      case 'TICKET_UPDATE':
      return action.event
      default:
      return state
    }
  }
  
  export default ticketFetched
  