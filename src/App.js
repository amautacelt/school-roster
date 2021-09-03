import React from 'react';
import './App.css';

import 'font-awesome/css/font-awesome.min.css'

function App() {
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
            <tr>
              <td>Kyle</td>
              <td>Coberly</td>
              <td>Teacher</td>
            </tr>
            <tr>
              <td>Brian</td>
              <td>Firooz</td>
              <td>Administrator</td>
            </tr>
            
          </tbody>
        </table>

        <form className="add-new">
          <h2>Add New Person</h2>
          <input required type="text" name="firstName" placeholder="First Name" />
          <input required type="text" name="lastName" placeholder="Last Name" />
          <select required name="role">
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

export default App;
