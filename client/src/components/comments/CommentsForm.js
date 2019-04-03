import React, {PureComponent} from 'react'


export default class CommentsForm extends PureComponent {
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
				<label>Comment</label>
					<input name="content" value={
						this.state.content !== undefined ? this.state.content : values.content || ''
					} onChange={ this.handleChange } />

				<label>Name</label>
					<input name="name" value={
						this.state.firstName !== undefined ? this.state.firstName : values.firstName || ''
					} onChange={ this.handleChange } />

				<button type="submit">Submit Comment</button>
			</form>
		)
	}
}

