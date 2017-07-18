import React, { Component } from 'react';
import AddMovie from './Components/AddMovie';
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
    title: "Titanic",
    genre: "Romance"
  },
  {
    id:6,
    title: "Batman",
    genre: "Action"
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
  render() {
    return(
      <div className="sortButton">
        <input type="button" value="Sort" />
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

  searchingFor(term) {
    return function(x){
      return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

  searchHandler(event) {
    this.setState({term: event.target.value})
  }

  fourthMethod(e) {
    const re =/[a-zA-Z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  render() {
    const{term, title} = this.state;
    return (
      <div className ="theList">
        <div>
          <form>
            <input type="text"
              onKeyPress={(e) => this.fourthMethod(e)}
              name="searchBox"
              placeholder="Search"
              onChange={this.searchHandler}
              value={term}
            />
          </form>

          {
            movies.filter(this.searchingFor(term)).map(titles =>
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
          <br />
          <List/>
        </div>
      </div>
    );
  }
}

export default App;
