import { EVENT_FETCHED } from "../actions/events";

export default function(state = null, action) {
  switch (action.type) {
  case EVENT_FETCHED:
    return action.payload

    default:
      return state
  }
}
