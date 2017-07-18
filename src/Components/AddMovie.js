import React, { Component } from 'react';

class AddMovie extends Component {

	constructor() {
		super();
		this.state = {
			newMovie: {}
		}
	}
	handleSubmit(e) {
		if(this.refs.title.value === '') {
			alert('Title is required');
		} else {
			this.setState({newMovie:{
				title: this.refs.title.value,
				genre: this.refs.genre.value
			}}, function() {
				this.props.AddMovie(this.state.newMovie);
			});
		}
		e.preventDefault();
	}

	render() {
		return (
			<div>
				<h3> Add Movie </h3>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div>
						<label>Title</label> <br />
						<input type="text" ref="title" />
					</div>
					<div>
						<label>Genre</label> <br />
						<input type="text" ref="genre" />
					</div>
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}

export default AddMovie;
