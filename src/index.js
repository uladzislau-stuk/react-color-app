import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './redux/store/configureStore'
import { App } from './containers'
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from '@material-ui/core/styles'

const rootElement = document.getElementById('root')
const store = configureStore()
const theme = createMuiTheme({})

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	rootElement
);
