import React, { Component } from 'react'
import uuid from 'uuid/v4'
import { ColorBox } from '../'
import './Palette.scss'

class Palette extends Component {
	render() {
		const { colors, level } = this.props;

		return (
			<div className="Palette">
				{colors[level].map((color) => (
					<ColorBox
						key={uuid()}
						name={color.name}
						color={color.hex}
					/>
				))}
			</div>
		);
	}
}

export default Palette;