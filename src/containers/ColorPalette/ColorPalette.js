import React, { Component } from 'react';
import './ColorPalette.scss'
import { Palette, NavBar } from '../../components/pages/ColorPalette'

class ColorPalette extends Component {
	constructor(props) {
		super(props)

		this.state = {
			level: 500,
			format: 'hex',
			showNotification: false
		}
	}
	handleChangeLevel = (level) => {
		this.setState({ level })
	}
	handleChangeFormat = (evt) => {
		let target = evt.target

		this.setState({
			[target.name]: target.value,
			showNotification: this.state.format !== target.value
		})
	}
	handleCloseNotification = () => {
		this.setState({
			showNotification: false
		})
	}
	render() {
		const { level, format, showNotification } = this.state
		const { colors } = this.props

		return (
			<div className="ColorPalette">
				<NavBar
					level={level}
					format={format}
					changeLevel={this.handleChangeLevel}
					changeFormat={this.handleChangeFormat}
					showNotification={showNotification}
					closeNotification={this.handleCloseNotification}
				/>
				<Palette
					colors={colors}
					level={level}
					format={format}
				/>
			</div>
		);
	}
}

export default ColorPalette;