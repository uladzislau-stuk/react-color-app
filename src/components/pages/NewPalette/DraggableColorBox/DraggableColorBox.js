import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/styles'

const styles = {
	root: {
		display: "inline-flex",
		width: "20%",
		padding: "4px 10px 12px 10px",
		justifyContent: "space-between",
		alignItems: "flex-end",
		cursor: "pointer",
		textAlign: "center",
		marginBottom: "-4px",
		height: "25%",

		"&:hover svg": {
			color: "white",
			transform: "scale(1.5)"
		}
	},
	icon: {
		transition: "all 0.3s ease-in-out"
	}
}

function DraggableColorBox(props) {
	const {
		classes,
		color,
		name,
		deleteColor
	} = props

	return (
		<div
			className={classes.root}
			style={{ backgroundColor: color }}
		>
			<span>{name}</span>
			<DeleteIcon
				className={classes.icon}
				onClick={deleteColor}
			/>
		</div>
	)
}

export default withStyles(styles)(DraggableColorBox)