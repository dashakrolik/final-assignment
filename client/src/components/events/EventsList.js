// List of events that renders TicketsListContainer onclick

import * as React from 'react'
import { Link } from 'react-router-dom'

export default function EventsList(props) {
  console.log('I am EventsList')
    if (props.events) {
      return (<div  className="eventsList">
        <ul>{props.events.map((item, index) => {
            const { name, description, id } = item
            return <li key={id}><Link to={`/events/${id}`} >{name}</Link></li>
          })}
          </ul>
        </div>
        )
      } else {
    return (
      <div  className="eventsList">
      <br></br>
      <br></br>
      <br></br>
        <p>'Loading...'</p>
          <ul>
            <li>Sample List Item</li>
            <li>Sample List Item</li>
          </ul>
      </div>)
  }
}
