import React, { Component } from 'react'
import uuid from 'uuid/v4'
import { ColorBox } from '../'
import { withRouter } from 'react-router-dom'
import './Palette.scss'

class Palette extends Component {
	getShades = (colors, colorId) => {
		let newColors = []
		for (let format in colors) {
			if (colors.hasOwnProperty(format)) {
				newColors.push(colors[format].filter(color => color.id === colorId)[0])
			}
		}
		return newColors.slice(1)
	}

	render() {
		const { colors, level, format, match } = this.props;
		const isColorPalettePage = match.params.id && !match.params.colorId
		const colorBoxes = isColorPalettePage ? colors[level] : this.getShades(colors, match.params.colorId)

		return (
			<div className="Palette">
				{colorBoxes.map((color) => (
					<ColorBox
						key={uuid()}
						id={color.id}
						name={color.name}
						format={color[format]}
					/>
				))}
			</div>
		);
	}
}

export default withRouter(Palette);