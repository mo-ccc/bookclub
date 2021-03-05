import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux'
import store from './redux/store.js'
import Main from './Main.js'
import {BrowserRouter} from 'react-router-dom'

const App = () => {
  if (!(window.location.hostname.includes("."))){
    return(
      <div>
        <h1>not a subdomain</h1>
      </div>
    )
  }
  return (
    <Provider store={store}>
      
      <BrowserRouter>
        <div className="App">
          <Main/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;