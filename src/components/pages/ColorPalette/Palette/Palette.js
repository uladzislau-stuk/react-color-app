import React, { Component } from 'react'
import uuid from 'uuid/v4'
import './Palette.scss'

import { ColorBox } from '../'

class Palette extends Component {
	render() {
		const { colors } = this.props;

		return (
			<div className="Palette">
				{colors.map((color) => (
					<ColorBox
						key={uuid()}
						{...color}
					/>
				))}
			</div>
		);
	}
}

export default Palette;