import React, { Component } from 'react'
import uuid from 'uuid/v4'
import { ColorBox } from '../'
import './Palette.scss'

class Palette extends Component {
	render() {
		const { colors, level, format } = this.props;

		return (
			<div className="Palette">
				{colors[level].map((color) => (
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

export default Palette;