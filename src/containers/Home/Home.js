import React, { Component } from 'react'
import { PaletteList } from '../../components/pages/Home'
import { withStyles } from '@material-ui/styles'

import './Home.scss'

const styles = {
	root: {
		display: "flex",
		justifyContent: "center",
		height: "100vh",
		backgroundColor: "blue"
	},
	container: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		width: "50%"
	},
	nav: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%"
	}
}

class Home extends Component {
	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
					</nav>
					<PaletteList {...this.props} />
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Home)