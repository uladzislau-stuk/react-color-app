import React, {Component} from 'react'
import { withTheme } from '@material-ui/styles'
import styled, { css } from 'styled-components'
import { DraggableColorList, PaletteFormNav } from '../../components/pages/NewPalette'
import { Drawer, Typography, Divider, IconButton, Button }  from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import arrayMove  from 'array-move'

const StyledRoot = styled.div`
	display: flex
`

const StyledDrawer = styled(({ drawerWidth, ...other }) => (
	<Drawer {...other} classes={{ paper: 'paper' }} />
))`
	width: ${props => props.drawerWidth}px;
	flex-shrink: 0;
	
	& .paper {
		width: ${props => props.drawerWidth}px;
	}
`

const StyledDrawerHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 8px;
	${props => props.theme.mixins.toolbar};
`

const StyledContent = styled.main`
	flex-grow: 1;
	height: calc(100vh - 64px);
	padding: ${props => props.theme.spacing(3)};
	margin-left: ${props => -props.drawerWidth}px;
	transition: ${props => props.theme.transitions.create('margin', {
		easing: props.theme.transitions.easing.sharp,
		duration: props.theme.transitions.duration.leavingScreen
	})};
	${props => props.open &&
		css`
		transition: ${props => props.theme.transitions.create('margin', {
			easing: props.theme.transitions.easing.easeOut,
			duration: props.theme.transitions.duration.enteringScreen
		})};
		margin-left: 0;
		`
	}
`

class NewPalette extends Component {
	static defaultProps = {
		maxColors: 20,
		drawerWidth: 400
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
	handleDeleteColor = (name) => this.setState(st => ({
		colors: st.colors.filter(color => color.name !== name)
	}))
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
			theme,
			createPalette,
			maxColors, drawerWidth
		} = this.props

		const {
			open,
			newColorHex,
			newColorName,
			colors
		} = this.state

		const isPaletteFull = maxColors <= colors.length

		return (
			<StyledRoot>
				<PaletteFormNav
					open={open}
					theme={theme}
					drawerWidth={drawerWidth}
					drawerOpen={this.handleDrawerOpen}
					createPalette={() => createPalette({
						paletteName: 'Test Palette',
						id: 'test-palette',
						emoji: '',
						colors
					})}
				/>
				<StyledDrawer
					drawerWidth={drawerWidth}
					variant="persistent"
					anchor="left"
					open={open}>
					<StyledDrawerHeader theme={theme}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</StyledDrawerHeader>
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
				</StyledDrawer>
				<StyledContent
					theme={theme}
					drawerWidth={drawerWidth}
					open={open}
				>
					<StyledDrawerHeader theme={theme}/>
					<DraggableColorList
						colors={colors}
						deleteColor={this.handleDeleteColor}
						axis='xy'
						onSortEnd={this.handleSortColorsEnd}
						pressDelay={100}
					/>
				</StyledContent>
			</StyledRoot>
		)
	}
}

export default withTheme(NewPalette)