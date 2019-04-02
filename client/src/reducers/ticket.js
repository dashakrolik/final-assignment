import { 
  TICKET_FETCHED,
  EDIT_TICKET
  
} from "../actions/tickets";

export default function(state = null, action) {
  switch (action.type) {
  case TICKET_FETCHED:
    return action.payload

  case EDIT_TICKET:
  if (action.payload.id === state.id) {
    return action.payload
  }
  else return state

  default:
    return state
  }
}

