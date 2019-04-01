// List of events that renders TicketsListContainer onclick

import * as React from 'react'
import { Link } from 'react-router-dom'

export default function EventsList(props) {
    let name = props
    console.log(name)
    console.log(props)

  console.log('I am EventsList props', props.events)
    if (props.events) {
      return (<div  className="eventsList"><br></br><br></br>
        <ul>{props.events.events.map((item) => {
            const { name, id } = item
            return <li key={id}>
            ><Link to={`/events/${id}`} >{name} | Id: {id}</Link>
            </li>
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
