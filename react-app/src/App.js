import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import JW from './components/json_view.js'
import NavBar from './components/Navbar.js'
import Landing from './views/landing.js'

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Landing/>
          </Route>
        </Switch>
      </BrowserRouter>
      <JW/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      crossOrigin="anonymous"
      />
    </div>
  );
}

export default App;
