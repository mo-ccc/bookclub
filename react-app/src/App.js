import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar.js'
import Landing from './views/landing.js'

const App = () => {
  const x = window.location.hostname.split(".")[0]
  const [TenantInfo, setTenantInfo] = useState('')
  useEffect(() => {
    fetch(`http://${x}.localhost:5000/`)
    .then(response => response.json())
    .then(json => setTenantInfo(json));
  }, [])

  return (
    <div className="App">
      <NavBar primary={TenantInfo.primary_color}/>
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Landing/>
          </Route>
        </Switch>
      </BrowserRouter>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      crossOrigin="anonymous"
      />
    </div>
  );
}

export default App;
