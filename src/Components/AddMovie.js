import React, { Component } from 'react';

class AddMovie extends Component {

  constructor() {
    super();
    this.state = {
      movies: movies,
      newMovie: {}
    }
  }

  handleSubmit(e) {
    if(this.refs.title.value === '') {
      alert('Title is required');
    } else {
      this.setState({newMovie:{
        title: this.refs.title.value,
        genre: this.refs.genre.value,
      }}, function() {
        this.props.AddMovie(this.state.newMovie);
        (this.state.movies).push(this.state.newMovie);
        console.log(movies);
        this.forceUpdate();
      });
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h3> Add & Sort Movies </h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title:</label> <br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Genre:</label> <br />
            <input type="text" ref="genre" />
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <br/>
        <SortButton movies = {this.state.movies} />
        <List movies = {this.state.movies} />
      </div>
    )
  }
}

export default AddMovie;
