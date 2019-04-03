import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const COMMENT_CREATE = 'COMMENT_CREATE'
export const SELECTED_COMMENTS_FETCHED = 'SELECTED_COMMENTS_FETCHED' //Selected all


export const createComment = (comment) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    if (isExpired(jwt)) return dispatch(logout())
    request
    .post(`${baseUrl}/tickets/comments/${ticketId}`)
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


