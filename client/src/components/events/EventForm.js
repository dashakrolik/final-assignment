import React, {PureComponent} from 'react'


export default class EventForm extends PureComponent {
  state = {}

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.onSubmit(this.state)
	}

	render() {
		const values = this.props.values || {}
		return (
			<form onSubmit={this.handleSubmit} className='createEventForm'>
				<label>Event name</label>
					<input name="name" value={
						this.state.name !== null || undefined ? this.state.name : values.name || ''
					} onChange={ this.handleChange } />

				<label>Event picture url</label>
					<input name="picture url" value={
						this.state.picture !== null || undefined ? this.state.picture : values.picture || ''
					} onChange={ this.handleChange } />

				<label>Event description</label>
					<input name="description" value={
						this.state.description !== null || undefined ? this.state.description : values.description || ''
					} onChange={ this.handleChange } />

				<label>Start</label>
					<input name="start" value={
						this.state.start !== null || undefined ? this.state.start : values.start || ''
					} onChange={ this.handleChange } />

				<label>End</label>
					<input name="end" value={
						this.state.end !== null || undefined ? this.state.end : values.end || ''
					} onChange={ this.handleChange } />

				<button type="submit" className='btn'>Submit</button>
			</form>
		)
	}
}

