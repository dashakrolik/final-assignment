import React, {PureComponent} from 'react'

export default class TicketForm extends PureComponent {
  state = { }

  handleChange = (event) => {
    const { name, value } = event.target

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
				<label>Url</label>
					<input name="url" value={
						this.state.url !== undefined ? this.state.picture : values.picture || null
					} onChange={ this.handleChange } />

        <label>Price</label>
					<input name="price" value={
						this.state.price !== undefined ? this.state.price : values.price || null
					} onChange={ this.handleChange } />


				<label >Description</label>
					<input name="description" value={
						this.state.description !== undefined ? this.state.description : values.description || null
					} onChange={ this.handleChange } />

				<button type="submit">Submit</button>
			</form>
		)
	}
}
