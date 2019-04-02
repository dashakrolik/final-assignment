import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ALL_TICKETS_FETCHED = 'ALL_TICKETS_FETCHED' //ALL
export const TICKET_FETCHED = 'TICKET_FETCHED' //One detailed
export const TICKET_CREATE = 'TICKET_CREATE'
export const EDIT_TICKET = 'EDIT_TICKET'
export const SELECTED_TICKETS_FETCHED = 'SELECTED_TICKETS_FETCHED' //Selected all

export const loadTickets = () => (dispatch) => {
    request
    .get(`${baseUrl}/tickets`)
     .then(response => dispatch({
       type: ALL_TICKETS_FETCHED,
       payload: response.body.tickets
     }))
     .catch(err => alert(err))
}


export const loadTicket = (ticketId) => (dispatch) => {
    request 
    .get(`${ baseUrl }/tickets/${ ticketId }`)
    .then( response => dispatch({
        type: TICKET_FETCHED,
        payload: response.body
    }))
    .catch(err => alert(err))
}

export const loadSelectedTcikets = (eventId) => (dispatch) => {
    request
    .get(`${ baseUrl }/events/tickets/${ eventId }`)
    .then( response => dispatch({
        type: SELECTED_TICKETS_FETCHED,
        payload: response.body.tickets
    }))
    .catch(err => alert(err))
  }



export const createTicket = (ticket) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    if (isExpired(jwt)) return dispatch(logout())
    request
    .post(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(response => dispatch({
        type: TICKET_CREATE,
        payload: response.body
    }))
    .catch(err => alert(err))
}

//creating still doesn;t work, smth is up with the endpoint propbably


export const editTicket = (ticketId, data) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    if (isExpired(jwt)) return dispatch(logout())
    request
      .put(`${baseUrl}/tickets/${ticketId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(data)
      .then(response => dispatch({
        type: EDIT_TICKET,
        payload: response.body
      }))
      .catch(err => alert(err))
  }