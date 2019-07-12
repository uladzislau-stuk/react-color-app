import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

function PaletteFormNav({
	open, theme, drawerWidth,
	drawerOpen, createPalette
	}) {
	return (
		<Fragment>
			<CssBaseline />
			<StyledAppBar
				open={open}
				drawerWidth={drawerWidth}
				theme={theme}
				position="fixed"
				>
				<Toolbar>
					<StyledIconButton
						open={open}
						theme={theme}
						onClick={drawerOpen}
						color="inherit"
						aria-label="Open drawer"
						edge="start"
					>
						<MenuIcon />
					</StyledIconButton>
					<Typography variant="h6" noWrap>
						Persistent drawer
					</Typography>
					<Link to="/" className="go-back">
						<Button
							variant='contained'
							color='secondary'>
							Go Back
						</Button>
					</Link>
					<Button
						variant='contained'
						color='primary'
						onClick={createPalette}>
						Save Palette
					</Button>
				</Toolbar>
			</StyledAppBar>
		</Fragment>
	)
}

var StyledIconButton = styled(({ open, theme, ...other }) => (
	<IconButton {...other} classes={{root: 'root'}} />
))`
	&.root {
		margin-right: ${props => props.theme.spacing(2)}px;
		${props => props.open &&
			css`
			display: none;
			`
		}
	} 
	
`

var StyledAppBar = styled(({ open, theme, drawerWidth, ...other }) => {
	return <AppBar {...other} classes={{root: 'root'}}/>
})`
	&.root {
		transition: ${props => props.theme.transitions.create(['margin', 'width'], {
		easing: props.theme.transitions.easing.sharp,
		duration: props.theme.transitions.duration.leavingScreen
		})};
	${props => props.open &&
	css`
		width: calc(100% - ${props => props.drawerWidth}px);
		margin-left: ${props => props.drawerWidth}px;
		transition: ${props => props.theme.transitions.create(['margin', 'width'], {
			easing: props.theme.transitions.easing.easeOut,
			duration: props.theme.transitions.duration.enteringScreen,
		})};
	`
	}
	
	& .go-back {
		margin-left: auto;
		margin-right: 15px;
	}
`

export default PaletteFormNav