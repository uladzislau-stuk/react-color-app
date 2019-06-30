import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import uuid from 'uuid/v4'
import './PaletteList.scss'

class PaletteList extends Component {
	render() {
		const { palettes } = this.props

		return (
			<div className="PaletteList">
				{palettes.map(palette => (
					<p key={uuid()}>
						<NavLink
							to={`/palette/${palette.id}`}
							activeClassName="PaletteList-item"
						>
							{palette.paletteName}
						</NavLink>
					</p>
				))}
			</div>
		);
	}
}

export default PaletteList;