import React, {PureComponent} from 'react'

export default class TicketForm extends PureComponent {
  state = { values: '' }

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
						this.state.url !== null || undefined ? this.state.picture : values.picture || ''
					} onChange={ this.handleChange } />

        <label>Price</label>
					<input name="price" value={
						this.state.price !== null || undefined ? this.state.price : values.price || ''
					} onChange={ this.handleChange } />

        <label>Date created</label>
					<input name="dateCreated" value={
						this.state.dateCreated !== null || undefined ? this.state.dateCreated : values.dateCreated || ''
					} onChange={ this.handleChange } />

				<label >Description</label>
					<input name="description" value={
						this.state.description !== null || undefined ? this.state.description : values.description || ''
					} onChange={ this.handleChange } />
<br></br>
				<button type="submit">Submit</button>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
			</form>
		)
	}
}
