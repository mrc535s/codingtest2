import React, { Component } from 'react';
import './App.css';

var movies = [
  {
    id: 1,
    title: "Lord of the Rings",
    genre: "Fantasy"
  },
  {
    id:2,
    title: "Avengers",
    genre: "Action"
  },
  {
    id:3,
    title: "Pulp Fiction",
    genre: "Drama"
  },
  {
    id:4,
    title: "Harry Potter",
    genre: "Fantasy"
  },
  {
    id:5,
    title: "Argo",
    genre: "Drama"
  },
  {
    id:6,
    title: "Inception",
    genre: "Action"
  },
  {
    id:7,
    title: "Spiderman: Homecoming",
    genre: "Action"
  },
  {
    id:8,
    title: "Shaun of the Dead",
    genre: "Comedy"
  }
]

 class Input extends Component {
  render() {
    return(
      <div className="theInput">
        <input type="text"
        name="inputBox"/>
      </div>
    )
  }
}

class SortButton extends Component {
  constructor() {
    super();
    this.state = {
      movies: {}
    }
  }

  render() {
    return(
      <div className="button">
        <input type="button"
         value="Sort"
         />
      </div>
    )
  }
}

class AddMovie extends Component {
  constructor() {
    super();
    this.state = {
      movies: movies,
      newMovie: {}
    }
  }

  handleSubmit(e) {
    if((this.refs.title.value === '') ||
      this.refs.genre.value === '')  {
      alert('Title and Genre is required.');
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

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: {},
      term: ''
    }

    this.searchHandler = this.searchHandler.bind(this);
  }

  searchingFor(term) {
    return function(x){
      return x.title.toLowerCase().includes(term.toLowerCase()) ||
      x.genre.toLowerCase().includes(term.toLowerCase()) ||
      !term ;
    }
  }

  searchHandler(event) {
    this.setState({term: event.target.value})
  }

  onlyAlphabet(e) {
    const re =/[a-zA-Z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  render() {
    const{term} = this.state;
    return (
      <div className ="theList">
        <div>
          <form>
            <h3> Search & Filter </h3>
            <input type="text"
              onKeyPress={(e) => this.onlyAlphabet(e)}
              name="searchBox"
              placeholder="Search"
              onChange={this.searchHandler}
              value={term}
            />
          </form>
          {
            movies.filter(this.searchingFor(term)).map(titles =>
              <ul className="filter-list" key={titles.id}>
                <b>{titles.title}</b>
                <br/>
                <sub>{titles.genre}</sub>
              </ul>
              )
          }
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      movies: movies
    }
  }

  handleAddMovie(project) {
    console.log(project);
  }

  render() {
    return (
      <div className ="App">
          <AddMovie AddMovie={this.handleAddMovie.bind(this)}/>
          <br />
      </div>
    );
  }
}

export default App;
