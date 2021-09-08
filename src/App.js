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
    },
    searchTerm: "",
    currentFilter: "all",
    currentSort: "",
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
        role: "student",
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


  displayedPeople = () => {
    return this.state.people.filter(person => {
      if (!this.state.searchTerm){
        return true
      } else {
          return (
            person.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase())
              || person.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase())
          )
      }
    }).filter(person => {
      if (this.state.currentFilter == "all"){
        return true
      } else {
        return person.role === this.state.currentFilter
      }
    }).sort((a, b) => {
      if (!this.state.currentSort) {
        return 0
      } else {
        return a[this.state.currentSort] >= b[this.state.currentSort]
          ? 1
          : -1
      }
    })
  }


  updateSearchTerm = event => {
    this.setState({
      searchTerm: event.target.value
    })
  }


  updateCurrentFilter = event => {
    this.setState({
      currentFilter: event.target.value
    })
  }


  updateCurrentSort = sortCriterion => {
    this.setState({
      currentSort: sortCriterion
    })
  }


  render() {
    return (
      <div className="App">

        <header>
          <h1>Student Roster</h1>
          <div className="search-and-filter">
            <form className="search">
              <input onChange={this.updateSearchTerm} type="text" name="search-term" />
              <i className="fa fa-search"></i>
            </form>
            <form className="filter">
              <select onChange={this.updateCurrentFilter} value={this.state.currentFilter}>
                <option value="all">Show all</option>
                <option value="student">Show only students</option>
                <option value="teacher">Show only teachers</option>
                <option value="administrator">Show only admins</option>
              </select>
            </form>
          </div>
        </header>

        <main>
          <table className="people-table">
            <thead>
              <tr>
                <th>First Name 
                  <button className={this.state.currentSort === "firstName" ? "active-sort" : undefined} onClick={() => {this.updateCurrentSort("firstName")}}> 
                    <i className="fa fa-caret-down"> </i> 
                  </button> 
                </th>
                <th>Last Name 
                  <button className={this.state.currentSort === "lastName" ? "active-sort" : undefined} onClick={() => {this.updateCurrentSort("lastName")}}> 
                    <i className="fa fa-caret-down"> </i> 
                  </button> 
                </th>
                <th>Role 
                  <button className={this.state.currentSort === "role" ? "active-sort" : undefined} onClick={() => {this.updateCurrentSort("role")}}> 
                    <i className="fa fa-caret-down"> </i> 
                  </button> 
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.displayedPeople().map(person => {
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
