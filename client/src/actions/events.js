import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS'
export const EVENT_FETCHED = 'EVENT_FETCHED'

export const loadEvents = () => (dispatch) => {
  request
  .get(`${ baseUrl }/events`)
  .then( response => dispatch({
      type: EVENTS_FETCHED,
      payload: response.body.events
  }))
  .catch(err => alert(err))
}

export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(response => dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: response.body
    }))
    .catch(err => console.error(err))
}

export const loadEvent = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response => dispatch({
      type: EVENT_FETCHED,
      payload: response.body
    }))
    .catch(err => alert(err))
}



