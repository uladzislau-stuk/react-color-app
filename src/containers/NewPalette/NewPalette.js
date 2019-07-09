import React, {Component} from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import { DraggableColorBox } from '../../components/pages/NewPalette'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import uuid from 'uuid/v4'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'

const drawerWidth = 400

const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		height: "calc(100vh - 64px)",
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
})

class NewPalette extends Component {
	state = {
		open: true,
		color: '#315CA0',
		newColorName: '',
		prevColorName: '',
		colors: []
	}
	ruleIsColorNameUnique = 'isColorNameUnique'
	ruleIsColorUnique = 'isColorUnique'

	componentDidMount() {
		this.addIsColorUniqueRule().addIsColorNameUniqueRule()
	}
	componentWillUnmount() {
		ValidatorForm.removeValidationRule(this.ruleIsColorUnique)
		ValidatorForm.removeValidationRule(this.ruleIsColorNameUnique)
	}
	handleDrawerOpen = () => this.setState({open: true})

	handleDrawerClose = () => this.setState({open: false})

	handleColorChangeComplete = color => this.setState({ color })

	handleAddColor = () => this.setState(st => {
		const newColor = { color: st.color, name: st.newColorName }

		return {
			newColorName: '',
			prevColorName: st.color,
			colors: [...st.colors, newColor]
		}
	})

	handleChange = evt => this.setState({ newColorName: evt.target.value })

	addIsColorUniqueRule = () => {
		ValidatorForm.addValidationRule(this.ruleIsColorUnique, () => {
			if (!this.state.newColorName.length) return true

			return this.state.colors.every(
				({color}) => (color.toLowerCase() !== this.state.color.toLowerCase())
			)
		})

		return this
	}
	addIsColorNameUniqueRule = () => {
		ValidatorForm.addValidationRule(this.ruleIsColorNameUnique, value => {
			if (!this.state.newColorName.length) return true

			return this.state.colors.every(
				({name}) => (name.toLowerCase() !== value.toLowerCase())
			)
		})

		return this
	}

	render() {
		const { classes, theme } = this.props
		const { open, color, newColorName, prevColorName, colors } = this.state

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<Divider />
					<Typography variant='h4'>
						Design Your palette
					</Typography>
					<Button variant='contained' color='secondary'>
						Clear Palette
					</Button>
					<Button variant='contained' color='primary'>
						Random Color
					</Button>
					<ChromePicker
						color={color || prevColorName}
						onChangeComplete={newColor => this.handleColorChangeComplete(newColor.hex)}
					/>
					<ValidatorForm
						ref='form'
						onSubmit={this.handleAddColor}
						onError={errors => console.log(errors)}
					>
						<TextValidator
							value={newColorName}
							onChange={this.handleChange}
							validators={[
								'required',
								'isColorNameUnique',
								'isColorUnique'
							]}
							errorMessages={[
								'Enter color name',
								'Color name must be unique',
								'Color already exists'
							]}
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							style={{ backgroundColor: color || prevColorName }}
						>Add color
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					{colors.map(color => (
						<DraggableColorBox
							key={uuid()}
							color={color.color}
							name={color.name}
						/>
					))}
				</main>
			</div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(NewPalette)