import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
	root: {
		display: "inline-block",
		width: "20%",
		position: "relative",
		cursor: "pointer",
		textAlign: "center",
		marginBottom: "-4px",
		height: "25%"
	}
}

function DraggableColorBox(props) {
	const { classes, color } = props

	return (
		<div
			className={classes.root}
			style={{ backgroundColor: color }}
		>
			{color}
		</div>
	)
}

export default withStyles(styles)(DraggableColorBox)