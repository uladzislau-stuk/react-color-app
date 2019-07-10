import React, {Component} from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import { DraggableColorList } from '../../components/pages/NewPalette'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
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
import arrayMove  from 'array-move'

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
	static defaultProps = {
		maxColors: 20
	}
	constructor(props) {
		super(props)

		this.ruleIsColorNameUnique = 'isColorNameUnique'
		this.ruleIsColorUnique = 'isColorUnique'

		this.state = {
			open: true,
			newColorHex: '#315CA0',
			newColorName: '',
			colors: []
		}
	}

	componentDidMount() {
		this.addIsColorUniqueRule().addIsColorNameUniqueRule()
	}
	componentWillUnmount() {
		ValidatorForm.removeValidationRule(this.ruleIsColorUnique)
		ValidatorForm.removeValidationRule(this.ruleIsColorNameUnique)
	}
	handleDrawerOpen = () => (
		this.setState({ open: true })
	)
	handleDrawerClose = () => (
		this.setState({ open: false })
	)
	handleHexChangeComplete = hex => (
		this.setState({ newColorHex: hex })
	)
	handleAddColor = () => this.setState(st => ({
		newColorName: '',
		colors: [...st.colors, {
			color: st.newColorHex,
			name: st.newColorName
		}]
	}))
	// handleDeleteColor = name => this.setState(st => {
	// 	// or filter much shorter
	// 	const idx = st.colors.findIndex(color => color.name === name)
	//
	// 	return {colors: [
	// 		...st.colors.slice(0, idx),
	// 		...st.colors.slice(idx + 1)
	// 	]}
	// })
	handleDeleteColor = name => {
		// or filter much shorter
		const idx = this.state.colors.findIndex(color => color.name === name)

		this.setState(st => ({colors: [
				...st.colors.slice(0, idx),
				...st.colors.slice(idx + 1)
				]}))
	}
	clearPalette = () => this.setState({
		colors: []
	})
	addRandomColor = () => {
		const allColors = this.props.palettes.map(palette => palette.colors).flat()

		if (!allColors.length ) return

		let randomNum = Math.round(Math.random() * allColors.length)

		this.setState(st => ({
			colors: [
				...st.colors,
				allColors[randomNum]
			]
		}))
	}
	handleSortColorsEnd = ({oldIndex, newIndex}) => {
		this.setState(st => ({
			colors: arrayMove(st.colors, oldIndex, newIndex),
		}));
	}
	handleChange = evt => (
		this.setState({ newColorName: evt.target.value })
	)
	addIsColorUniqueRule = () => {
		ValidatorForm.addValidationRule(this.ruleIsColorUnique, () => {
			if (!this.state.newColorName.length) return true

			return this.state.colors.every(
				({color}) => (color.toLowerCase() !== this.state.newColorHex.toLowerCase())
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
		const {
			classes,
			theme,
			createPalette,
			maxColors
		} = this.props

		const {
			open,
			newColorHex,
			newColorName,
			colors
		} = this.state

		const isPaletteFull = maxColors <= colors.length

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
						<Button
							variant='contained'
							color='secondary'
							onClick={createPalette}>
							Save Palette
						</Button>
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
					<Button
						variant='contained'
						color='secondary'
						onClick={this.clearPalette}>
						Clear Palette
					</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={this.addRandomColor}
						disabled={isPaletteFull}>
						Random Color
					</Button>
					<ChromePicker
						color={newColorHex}
						onChangeComplete={newColor => this.handleHexChangeComplete(newColor.hex)}
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
							style={{
								backgroundColor: isPaletteFull
									? "grey"
									: newColorHex
							}}
							disabled={isPaletteFull}
						>
							{isPaletteFull
								? "Palette Full"
								: "Add color"
							}
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						deleteColor={this.handleDeleteColor}
						axis='xy'
						onSortEnd={this.handleSortColorsEnd}
					/>
				</main>
			</div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(NewPalette)