import { 
  ALL_TICKETS_FETCHED ,
  SELECTED_TICKETS_FETCHED,
  TICKET_CREATE,
  EDIT_TICKET,
  
} from "../actions/tickets";

export default function(state = [], action) {
  switch (action.type) {
  case ALL_TICKETS_FETCHED:
    return action.payload

  case SELECTED_TICKETS_FETCHED:
    return action.payload

  case TICKET_CREATE:
    return [ ...state, action.payload]

  case  EDIT_TICKET:
  return state.map(ticket => {
    if (ticket.id === action.payload.id) {
      return action.payload
    }
    else return ticket
  })

  default:
    return state
  }
}


