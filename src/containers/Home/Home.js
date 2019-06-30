import React, { Component } from 'react'
import { PaletteList } from "../../components/pages/Home"
import './Home.scss'

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<h1>React Colors</h1>
				<PaletteList {...this.props} />
			</div>
		)
	}
}

export default Home