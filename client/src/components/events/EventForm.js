// Form for creating events

import * as React from 'react'


export default function EventForm(props) {
      if (!props.values) {
        return <p>Event Form</p> } else {
          const { name, date, description } = props.values
            return (<div><br></br><br></br><br></br><br></br><br></br>
            <form onSubmit={props.onSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={name} onChange={props.onChange} />
              </label>
              <label>
                Date:
                <input type="text" name="date" value={date} onChange={props.onChange} />
              </label>
              <label>
                Description:
                <input type="text" name="description" value={description} onChange={props.onChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>)
}
}