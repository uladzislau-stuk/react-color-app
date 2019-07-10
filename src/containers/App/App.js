import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import generatePalette from '../../helpers/colorHelper.js'

import { ColorPalette, Home, NotFound, NewPalette } from '../'
import { addPalette } from "../../redux/actions/palettes"

import '../../utils/styles/global.scss'

function App({ palettes, addPalette }) {
	// return function () {
	// 	return dispatch(actionCreator.apply(this, arguments));
	// };
	function findPalette(id) {
		return palettes.find(palette => (
			palette.id === id
		))
	}

	function handleCreatePalette(newPalette) {
		addPalette(newPalette)
	}

	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/palette/new"
					render={() =>
						<NewPalette createPalette={handleCreatePalette}/>
					}
				/>
				<Route
					exact
					path="/"
					render={() =>
						<Home palettes={palettes}/>
					}
				/>
				<Route
					exact
					path="/"
					render={() =>
						<Home palettes={palettes}/>
					}
				/>
				<Route
					exact
					path="/palette/:id"
					render={routeProps => (
						<ColorPalette {...generatePalette(findPalette(routeProps.match.params.id))} />
					)}
				/>
				<Route
					exact
					path="/palette/:id/:colorId"
					render={routeProps => (
						<ColorPalette {...generatePalette(findPalette(routeProps.match.params.id))} />
					)}
				/>
				<Route render={NotFound}/>
			</Switch>
		</Router>
	)
}

const mapStateToProps = state => ({
	palettes: state.palettes.palettes
})

const mapDispatchToProps = {
	addPalette
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
