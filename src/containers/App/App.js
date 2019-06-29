import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from '../../redux/store/configureStore.js';

import generatePalette from '../../helpers/colorHelper.js'

import { ColorPalette } from '../'

import palettes from '../../test/mockData.js'

import '../../utils/styles/global.scss'

const store = configureStore();

function App() {
  const palette = generatePalette(palettes[0]);

  return (
      <Provider store={store}>
          <Router>
              <Switch>
                  <Route exact path="/" render={() => <div className="alert">Hello</div>} />
                  <Route exact path="/color-pallet/" render={() => <ColorPalette {...palette} />} />
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
