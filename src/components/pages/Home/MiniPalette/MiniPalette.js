import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import uuid from 'uuid/v4'

const styles = {
	root: {
		backgroundColor: "white",
		borderRadius: "5px",
		padding: "7px",
		border: "1px solid #e6e6e6",
		boxShadow: "10px 10px 47px -12px rgba(123, 123, 123, 1)",
		transition: "box-shadow 0.3s linear"
	},
	colors: {
		display: "flex",
		flexWrap: "wrap",
		backgroundColor: "#dae1e4",
		alignContent: "flex-start",
		height: "150px",
		width: "100%",
		borderRadius: "5px",
		overflow: "hidden"
	},
	color: {
		height: "25%",
		width: "20%"
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
	const { classes, id, emoji, paletteName, colors } = props
	const miniColorBoxes = colors.map(color => (
		<div
			key={uuid()}
			className={classes.color}
			style={{backgroundColor: color.color}}
		/>
	))

	return (
		<NavLink
			to={`/palette/${id}`}
			className={classes.root}
		>
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</NavLink>
	)
}

export default withStyles(styles)(MiniPalette)