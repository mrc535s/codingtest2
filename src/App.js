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


/*
  I'm having trouble setting state and sorting the data of the movies.
  What I want to do is pass in the movies from AddMovie however, whenever
  I try to set state in the constructor it keeps coming up as null.
  I was wondering how should I approach this problem, should I be putting the
  SortButton component within another component? or am I doing something wrong with
  setting the state? Also I'm not sure how sorting works in React
*/

class SortButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {} // You don't need the movie state here.
    }
    /* This console log comes up as null even when I pass in state from
      line 141. I'm not sure if this is the correct way to do this.

      ---Mike's NOTE---- 
      You don't want to use this.state.movies here.  
      You actually want to access the props (readonly) since it is being passed as a property

    */
    console.log(this.state.movies)
    console.log(this.props.movies);
  }

  /// You need to bind this function similiar to how you did the search function.
  // You will also probably need to pass a function down with the state from the parent function instead of defining here.

  sortData() {
  }

  render() {
    return(
      <div className="button">
        <input type="button"
          onClick={this.sortData} // so this would call this.props.sortData which is passed down from the parent function
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
        this.forceUpdate();
      });
    }
    e.preventDefault();
  }

  // sortMovies() { -- Make sure to bind this to the component
      //  sort the movies here so something like
      // this.state.movies.sort((a, b)=> {
        //... I won't give you all the answers :)
      //})
  // }

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
        <SortButton movies = {this.state.movies}/> 
        <List movies = {this.state.movies} />
      </div>
    )
    // For the <SortButton> you can passdown a sortMovies function that is bound the this component.
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
