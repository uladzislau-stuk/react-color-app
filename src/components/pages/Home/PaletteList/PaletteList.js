import React, {Component} from 'react'
import { MiniPalette } from '../'
import uuid from 'uuid/v4'
import { withStyles } from '@material-ui/styles'
import './PaletteList.scss'

const styles = {
	list: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "5%"
	}
}

class PaletteList extends Component {
	render() {
		const { palettes, classes } = this.props

		return (
			<div className={classes.list}>
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

export default withStyles(styles)(PaletteList);