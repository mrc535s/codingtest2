import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
        projects: []
    }
  }

  componentWillMount() {
    this.setState({
      projects: [
      {
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          title: 'Ecommerce Application',
          category: 'Web Development'
        }
      ],
      movieTitles: [
        {
          title: 'Lord of the Rings'
        },
        {
          title: 'Harry Potter'
        },
        {
          title: 'Pulp Fiction'
        },
        {
          title: 'Avengers'
        },
        {
          title: 'Indiana Jones'
        },
        {
          title: 'Finding Nemo'
        }
      ]
    });
  }

  handleAddProject(project) {
    console.log(project);
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Project:</h1>
          <AddProject addProject={this.handleAddProject.bind(this)}/>
          <Projects projects={this.state.projects}/>
        </div>
        <div>
          <h1> Movie Titles: </h1>
        </div>
      </div>
    );
  }
}

export default App;
