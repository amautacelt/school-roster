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
            <i>Icon</i>
          </form>
          <form className="filter">
          </form>

        </div>
      </header>
    </div>
  );
}

export default App;
