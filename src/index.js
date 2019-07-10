import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './redux/store/configureStore'
import { App } from './containers'

const rootElement = document.getElementById('root')
const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
