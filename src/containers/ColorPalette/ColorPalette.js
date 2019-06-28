import React, { Component } from 'react';
import './ColorPalette.scss'

import { Palette } from '../../components/pages/ColorPalette'

class ColorPalette extends Component {
	render() {
		return (
			<div className="ColorPalette">
				<Palette {...this.props} />
			</div>
		);
	}
}

export default ColorPalette;