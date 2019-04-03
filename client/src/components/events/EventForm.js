import React, {PureComponent} from 'react'


export default class EventForm extends PureComponent {
  state = { values: ''}

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
			<form onSubmit={this.handleSubmit}>
				<label>Event name</label>
					<input name="name" value={
						this.state.name !== undefined ? this.state.name : values.name || ''
					} onChange={ this.handleChange } />

				<label>Event picture url</label>
					<input name="url" value={
						this.state.url !== undefined ? this.state.url : values.url || ''
					} onChange={ this.handleChange } />

				<label>Event description</label>
					<input name="description" value={
						this.state.description !== undefined ? this.state.description : values.description || ''
					} onChange={ this.handleChange } />

				<label>Start</label>
					<input name="start" value={
						this.state.start !== undefined ? this.state.start : values.start || ''
					} onChange={ this.handleChange } />

				<label>End</label>
					<input name="end" value={
						this.state.end !== undefined ? this.state.end : values.end || ''
					} onChange={ this.handleChange } />

				<button type="submit">Submit</button>
			</form>
		)
	}
}

