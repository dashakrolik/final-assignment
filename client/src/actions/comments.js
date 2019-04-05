import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const COMMENT_CREATE = 'COMMENT_CREATE'
export const SELECTED_COMMENTS_FETCHED = 'SELECTED_COMMENTS_FETCHED'
export const ALL_COMMENTS_FETCHED = 'ALL_COMMENTS_FETCHED'

export const createComment = (comment) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    if (isExpired(jwt)) return dispatch(logout())
    request
    .post(`${baseUrl}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(comment)
    .then(response => dispatch({
        type: COMMENT_CREATE,
        payload: response.body
    }))
    .catch(err => alert(err))
}


export const loadSelectedComments = (ticketId) => (dispatch) => {
    request
    .get(`${baseUrl}/tickets/comments/${ticketId}`)
    .then( response => dispatch({
        type: SELECTED_COMMENTS_FETCHED,
        payload: response.body.comments
    }))
    .catch(err => alert(err))
  }

  export const loadComments = () => (dispatch) => {
    request
    .get(`${baseUrl}/comments`)
     .then(response => dispatch({
       type: ALL_COMMENTS_FETCHED,
       payload: response.body.comments
     }))
     .catch(err => alert(err))
}



