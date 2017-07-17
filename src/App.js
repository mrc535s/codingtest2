import React, { Component } from 'react';
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
  render() {
    return (
      <div className ="App">
        <div className="filter-list">
          <List/>
        </div>
      </div>
    );
  }
}

export default App;
