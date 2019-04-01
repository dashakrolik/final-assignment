// Renders details for selected ticket

// On the ticket page for a specific ticket, we want to show a text like:

// > "We calculated that the risk of this ticket being a fraud is XX%"

// The percentage should be calculated using the following algorithm:

// * if the ticket is the only ticket of the author, add 10%
// * if the ticket price is lower than the average ticket price for that event, that's a risk
// 	* if a ticket is X% cheaper than the average price, add X% to the risk 
// 	* if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction
// * if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
// * if there are >3 comments on the ticket, add 5% to the risk

// The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.

// The calculated risk of a ticket depends on many factors. Make sure that the risk value is always "live" (i.e. up to date).



import * as React from 'react'
import { Link } from 'react-router-dom'

export default function TicketDetails(props) {
    let name = props
    console.log(name)
    console.log(props)

  console.log('I am EventsList props', props.events)
    if (props.tickets) {
      return (<div  className="eventsList"><br></br><br></br>
        <ul>{props.tickets.tickets.map((item) => {
            const { name, id } = item
            return <li key={id}>
            ><Link to={`/tickets/${id}`} >{name} | Id: {id}</Link>
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

//Note to self:
// abot to take a long break, now on this part. Routing to the right place but
// the ticket details - smth is up with, smth is wrong
// TODO: make correct details render and
// start working on the algorithm
// TODO: indentation everywhere
// TODO: clean up the code