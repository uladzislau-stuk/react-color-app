import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from '../../redux/store/configureStore.js';

import generatePalette from '../../helpers/colorHelper.js'

import { ColorPalette, Home } from '../'

import palettes from '../../test/mockData.js'

import '../../utils/styles/global.scss'

const store = configureStore();

function App() {
  const findPalette = id => (
  	palettes.find(palette => (
  		palette.id === id
	))
  )

  return (
      <Provider store={store}>
          <Router>
              <Switch>
                  <Route
					  exact
					  path="/"
					  render={() =>
						  <Home palettes={palettes} />
					  }
				  />
                  <Route
					  exact
					  path="/palette/:id"
					  render={routeProps => (
						  <ColorPalette {...generatePalette(findPalette(routeProps.match.params.id))} />
					  )}
				  />
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
