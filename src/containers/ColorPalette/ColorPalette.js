import React, { Component } from 'react';
import './ColorPalette.scss'
import { Palette, NavBar } from '../../components/pages/ColorPalette'

class ColorPalette extends Component {
	constructor(props) {
		super(props)

		this.state = {
			level: 500
		}
	}

	handleChangeLevel = (level) => {
		this.setState({ level })
	}

	render() {
		const { level } = this.state
		const { colors } = this.props

		return (
			<div className="ColorPalette">
				<NavBar
					level={level}
					changeLevel={this.handleChangeLevel}
				/>
				<Palette
					colors={colors}
					level={level}
				/>
			</div>
		);
	}
}

export default ColorPalette;