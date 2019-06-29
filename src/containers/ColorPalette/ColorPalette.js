import React, { Component } from 'react';
import './ColorPalette.scss'
import Slider from 'rc-slider'
import { Palette } from '../../components/pages/ColorPalette'

import 'rc-slider/assets/index.css'

class ColorPalette extends Component {
	constructor(props) {
		super(props)

		this.state = {
			level: 500
		}
	}

	changeLevel = (level) => {
		this.setState({ level })
	}

	render() {
		const { level } = this.state
		const { colors } = this.props

		return (
			<div className="ColorPalette">
				<Slider
					min={100}
					max={900}
					step={100}
					onChange={this.changeLevel}
					defaultValue={this.state.level}
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