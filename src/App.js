import React, { Component } from 'react';
import './App.css';

import 'font-awesome/css/font-awesome.min.css'

const apiUrl = "https://react-build-and-burn.herokuapp.com"

class App extends Component {
  state = {
    people: [],
    newPerson: {
      firstName: "",
      lastName: "",
      role: "student"
    }
  }

  componentDidMount() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(people => {
        this.setState({people})
      })
  }
  updateNewPerson = event => {
    const key = event.target.name
    const value = event.target.value
    this.setState(state => {
      state.newPerson[key] = value
      return state
    })
  }
  addNewPerson = event => {
    event.preventDefault()

    const newPerson = {
      firstName: this.state.newPerson.firstName,
      lastName: this.state.newPerson.lastName,
      role: this.state.newPerson.role
    }

    this.setState(state => {
      state.people = [...state.people, newPerson]
      state.newPerson = {
        firstName: "",
        lastName: "",
        role: "student"
      }
      return state
    })

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPerson)
    }).catch(error => console.error(error.message))

  }
  render() {
    return (
      <div className="App">

        <header>
          <h1>Student Roster</h1>
          <div className="search-and-filter">
            <form className="search">
              <input type="text" name="search-term" />
              <i className="fa fa-search"></i>
            </form>
            <form className="filter">
              <select>
                <option value="all">Show all</option>
                <option value="students">Show only students</option>
                <option value="teachers">Show only teachers</option>
                <option value="administrators">Show only admins</option>
              </select>
            </form>
          </div>
        </header>

        <main>
          <table className="people-table">
            <thead>
              <tr>
                <th>First Name <button> <i className="fa fa-caret-down"> </i> </button> </th>
                <th>Last Name <button> <i className="fa fa-caret-down"> </i> </button> </th>
                <th>Role <button> <i className="fa fa-caret-down"> </i> </button> </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.people.map(person => {
                  return (
                    <tr>
                      <td>{person.firstName}</td>
                      <td>{person.lastName}</td>
                      <td>{person.role}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <form onSubmit={this.addNewPerson} className="add-new">
            <h2>Add New Person</h2>
            <input 
              onChange={this.updateNewPerson} 
              required 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={this.state.newPerson.firstName} 
            />
            <input 
              onChange={this.updateNewPerson}
              required 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={this.state.newPerson.lastName} 
            />
            <select onChange={this.updateNewPerson} required name="role" value={this.state.newPerson.role}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="administrator">Administrator</option>
            </select>
            <input type="submit" value="Add Person" />
          </form>
        </main>

      </div>
    );
  }
}

export default App;
