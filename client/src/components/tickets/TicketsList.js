// Gives a list of tickets

import * as React from 'react'
import { Link } from 'react-router-dom'

export default function TicketsList(props) {
  console.log('I am TicketsList props', props.tickets)
    if (props.tickets) {
      return (<div  className="ticketsList"><br></br><br></br>
        <ul>{props.tickets.tickets.map((item) => {
            const { description, id } = item
            return <li key={id}>
            ><Link to={`/tickets/${id}`} >Description: {description} | Ticket Id: {id} |</Link>
            </li>
          })}
          </ul>
        </div>
        )
      } else {
    return (
      <div  className="ticketsList">
      <br></br>
      <br></br>
      <br></br>
        <p>'Loading...'</p>
          <ul>
            <li>Ticketzzzz</li>
            <li>Sample List Item</li>
          </ul>
      </div>)
  }
}
