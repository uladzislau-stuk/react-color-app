import React, { Fragment } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from '../../redux/store/configureStore.js';

// Provider store=""
// Fragment ?
// BrowserRouter as Router
// Switch
// Route
import './App.scss'

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
          <Fragment>
              <Router>
                  <Switch>
                      <Route to="/" render={() => <div className="alert">Hello</div>} />
                  </Switch>
              </Router>
          </Fragment>
      </Provider>
  );
}

export default App;
