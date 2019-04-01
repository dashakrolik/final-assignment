import * as React from 'react'
import EventForm from './EventForm'

export default function EventDetails(props) {
  console.log('EventDetails props.onEdit test:', props.onEdit)
  console.log('EventDetails props.ourState test:', props.ourState)
  console.log('EventDetails props test:', props)

  if(props.event) {
  return (
    <div>
      {props.ourState && <EventForm onChange={props.onChange} values={props.values} onSubmit={props.onSubmit}/>}
      {!props.ourState && <div>
      <h1>{props.event.name}</h1>
      <i>{props.event.date}</i>
      <p>{props.event.description}</p>
      <button type="button" onClick={props.onDelete}>Delete</button>
      <button type="button" onClick={props.onClick}>Edit</button>
    </div>}
  </div>)
} else {
  return (<div><br></br><p>Loading..</p><p>Loading..</p><p>Loading..</p><p>Loading..</p><p>Loading..</p></div>)
}
}
