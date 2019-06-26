import  { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "../reducers/rootReducer.js"
// rootReducer
// redux-devtools-extension

export default function configureStore() {
	const middleware = applyMiddleware(thunkMiddleware)
	const composedMiddleware = composeWithDevTools(middleware)

	return createStore(rootReducer, composedMiddleware)
}