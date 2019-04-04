import React, {PureComponent} from 'react'

export default class TicketForm extends PureComponent {
	state = {}
	
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.onSubmit(this.state)
	}

  handleChange = (ticket) => {
    const { name, value } = ticket.target

    this.setState({
			[name]: value
		})
	}
	
	render() {
		const initialValues = this.props.initialValues || {}
		return (

			<form onSubmit={this.handleSubmit}>
						<br></br>			<br></br>			<br></br>			<br></br>
				<label>Url</label>
					<input name="url" id="url" value={
						this.state.url !== null || undefined ? this.state.url : initialValues.url || ''
					} onChange={ this.handleChange } />

        <label>Price</label>
					<input name="price" id="price" value={
						this.state.price !== null || undefined ? this.state.price : initialValues.price || ''
					} onChange={ this.handleChange } />

        <label>Date created</label>
					<input name="dateCreated" id="dateCreated" value={
						this.state.dateCreated !== null || undefined ? this.state.dateCreated : initialValues.dateCreated || ''
					} onChange={ this.handleChange } />

				<label >Description</label>
					<input name="description" id="description" value={
						this.state.description !== null || undefined ? this.state.description : initialValues.description || ''
					} onChange={ this.handleChange } />

				<br></br>

				<button type="submit">Submit</button>
				
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
			</form>
		)
	}
}
