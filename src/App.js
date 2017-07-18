import React, { Component } from 'react';
import AddMovie from './Components/AddMovie';
import './App.css';

const movies = [
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
    title: "Titanic",
    genre: "Romance"
  },
  {
    id:6,
    title: "Batman",
    genre: "Action"
  }
]


function searchingFor(term) {
    return function(x){
      return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

class Input extends React.Component {
  render() {
    return(
      <div className="theInput">
        <input type="text"
        name="inputBox"/>
      </div>
    )
  }
}

class Button extends Component {

  constructor() {
    super();
    this.state = {
      movies:{}
    }
  }

  handleSubmit(e) {
    if(this.refs.title.value === '') {
      alert('Input Required');
    } else {
      this.setState({ movies:{
        title: this.refs.title.value,
        genre: this.refs.genre.value

      }}, function(){
        this.props.Button(this.state.movies);
        //console.log(this.state);
      });
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="AddMovie">
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <label>Title</label> <br />
          <input type="text" ref="title" />
        </div>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

class List extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        movies: movies,
        term: '',
      }

      this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
      this.setState({term: event.target.value})
    }

    render() {
      const{term, title} = this.state;
      return (
        <div className ="theList">
          <div>
            <form>
              <input type="text"
                name="searchBox"
                placeholder="Search"
                onChange={this.searchHandler}
                value={term}
              />
            </form>

            {
              movies.filter(searchingFor(term)).map(titles =>
                <ul key={titles.id}>
                  {titles.title}
                </ul>
                )
            }
          </div>
        </div>
    );
  }
}

class App extends React.Component {

  handleAddMovie(project) {
    console.log(project);
  }

  render() {
    return (
      <div className ="App">
        <h3> Filter a Movie List </h3>
        <div className="filter-list">
          <AddMovie AddMovie={this.handleAddMovie.bind(this)}/>
          <List/>
        </div>
      </div>
    );
  }
}

export default App;
