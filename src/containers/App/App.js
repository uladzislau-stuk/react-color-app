import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from '../../redux/store/configureStore.js';

import '../../utils/styles/global.scss'

import palettes from '../../test/mockData.js'

import { ColorPalette } from '../'

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
          <Router>
              <Switch>
                  <Route exact path="/" render={() => <div className="alert">Hello</div>} />
                  <Route exact path="/color-pallet/" render={() => <ColorPalette {...palettes[0]} />} />
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
