import React, {Component} from 'react'
import { MiniPalette } from '../'
import uuid from 'uuid/v4'
import './PaletteList.scss'

class PaletteList extends Component {
	render() {
		const { palettes } = this.props

		return (
			<div className="PaletteList">
				{palettes.map(palette => (
					<MiniPalette
						key={uuid()}
						{...palette}
					/>
				))}
			</div>
		);
	}
}

export default PaletteList;