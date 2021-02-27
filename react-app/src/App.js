import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar.js'
import Landing from './views/Landing.js'

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
      <NavBar tenantInfo={TenantInfo}/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing tenantInfo={TenantInfo}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
