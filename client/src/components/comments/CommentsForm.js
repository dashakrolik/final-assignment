import React, {PureComponent} from 'react'


export default class CommentsForm extends PureComponent {
  state = {}

  handleChange = (comment) => {
    const {name, value} = comment.target
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
				<button type="submit">Submit Comment</button>
			</form>
		)
	}
}

