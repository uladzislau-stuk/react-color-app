import React, { Component, Fragment } from 'react'
import Slider from 'rc-slider'
import { Link, withRouter } from 'react-router-dom'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'

import 'rc-slider/assets/index.css'
import './NavBar.scss'

class NavBar extends Component {
	render() {
		const {
			level,
			format,
			showNotification,
			changeLevel,
			changeFormat,
			closeNotification,
			match
		} = this.props

		const isColorPalettePage = match.params.id && !match.params.colorId

		return (
			<div className="NavBar">
				<div className="logo">
					<Link to="/">reactcolorapp</Link>
				</div>
				{isColorPalettePage && (
					<Fragment>
						<div className="slider-container">
							<span className="slider-level">
								Level: {level}
							</span>
							<div className="slider">
								<Slider
									className="slider"
									min={100}
									max={900}
									step={100}
									onChange={changeLevel}
									defaultValue={level}
								/>
							</div>
						</div>
						<div className="select">
							<Snackbar
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								open={showNotification}
								autoHideDuration={4000}
								onClose={closeNotification}
								ContentProps={{
									'aria-describedby': 'format-notification-id',
								}}
								message={
									<span id="format-notification-id">Format Changed to {format.toUpperCase()}</span>
								}
								action={[
									<IconButton
										key="close"
										aria-label="Close"
										color="inherit"
										onClick={closeNotification}
									>
										<CloseIcon />
									</IconButton>,
								]}
							/>
							<Select
								onChange={changeFormat}
								value={format}
								name="format"
							>
								<MenuItem value="hex">HEX - #fff</MenuItem>
								<MenuItem value="rgb">RGB - (255, 255, 255)</MenuItem>
								<MenuItem value="rgba">RGBA - (255, 255, 255, 1.0)</MenuItem>
							</Select>
						</div>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withRouter(NavBar);