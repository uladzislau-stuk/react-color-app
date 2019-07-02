import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
	main: {
		backgroundColor: "purple",
		border: "3px solid teal"
	},
};

const MiniPalette = (props) => {
	const { classes } = props
	console.log(classes)
	return (
		<div>

		</div>
	)
}

export default withStyles(styles)(MiniPalette)