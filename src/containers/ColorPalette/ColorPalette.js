import React, { Component } from 'react';
import './ColorPalette.scss'
import { Palette, NavBar } from '../../components/pages/ColorPalette'

class ColorPalette extends Component {
	constructor(props) {
		super(props)

		this.state = {
			level: 500,
			format: 'hex'
		}
	}
	handleChangeLevel = (level) => {
		this.setState({ level })
	}
	handleChangeFormat = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value })
	}
	render() {
		const { level, format } = this.state
		const { colors } = this.props

		return (
			<div className="ColorPalette">
				<NavBar
					level={level}
					format={format}
					changeLevel={this.handleChangeLevel}
					changeFormat={this.handleChangeFormat}
				/>
				<Palette
					colors={colors}
					level={level}
					format={format}
				/>
			</div>
		);
	}
}

export default ColorPalette;