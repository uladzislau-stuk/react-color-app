import React, { Component } from 'react'
import Slider from 'rc-slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import 'rc-slider/assets/index.css'
import './NavBar.scss'

class NavBar extends Component {
	render() {
		const { level, format, changeLevel, changeFormat } = this.props

		return (
			<div className="NavBar">
				<div className="logo">
					<a href="#">reactcolorapp</a>
				</div>
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
			</div>
		);
	}
}

export default NavBar;