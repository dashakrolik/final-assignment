import { COMMENT_CREATE, SELECTED_COMMENTS_FETCHED, ALL_COMMENTS_FETCHED } from "../actions/comments";
  
  export default function(state = [], action) {
    switch (action.type) {
    case SELECTED_COMMENTS_FETCHED:
      return action.payload
  
    case COMMENT_CREATE:
      return [ ...state, action.payload]

    case ALL_COMMENTS_FETCHED:
    return action.payload

    default:
      return state
    }
  }
  
