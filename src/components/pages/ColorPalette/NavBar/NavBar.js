import React, { Component } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './NavBar.scss'

class NavBar extends Component {
	render() {
		const { level, changeLevel } = this.props

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
			</div>
		);
	}
}

export default NavBar;