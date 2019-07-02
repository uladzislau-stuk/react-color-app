import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

const styles = {
	root: {
		backgroundColor: "white",
		borderRadius: "5px",
		padding: "5px",
		position: "relative",
		overflow: "hidden"
	},
	colors: {
		backgroundColor: "grey"
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: "0",
		color: "black",
		paddingTop: "5px",
		fontSize: "15px",
		position: "relative"
	},
	emoji: {
		marginLeft: "0.5rem",
		fontSize: "15px"
	}
}

const MiniPalette = (props) => {
	const { classes, id, emoji, paletteName } = props

	return (
		<NavLink
			to={`/palette/${id}`}
			className={classes.root}
		>
			<div className={classes.colors} />
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</NavLink>
	)
}

export default withStyles(styles)(MiniPalette)