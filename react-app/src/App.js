import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux'
import store from './redux/store.js'
import Main from './Main.js'
import {BrowserRouter} from 'react-router-dom'

const App = () => {
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