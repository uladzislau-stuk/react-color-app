import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import chroma from 'chroma-js'
import { Link, withRouter } from 'react-router-dom'

class ColorBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			copied: false
		};

		this.toUpperCaseFirst = (word) => word[0].toUpperCase() + word.slice(1);
	}
	copy = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 2000)
		});
	};

	render() {
		const { id, name, format: background, location, match } = this.props
		const { copied } = this.state

		const isColorPalettePage = match.params.id && !match.params.colorId
		const isDarkColor = chroma(background).luminance() <= 0.3

		const textColorClass = ` text-${isDarkColor ? 'white' : 'black'}`
		const textShadowClass = ` text-${isDarkColor ? 'shadow-black' : 'shadow-grey'}`
		const bgColorClass = ` bg-${isDarkColor ? 'grey' : 'white'}`
		const boxSizeClass = ` size${isColorPalettePage ? "-s" : "-l"}`
		const shouldAddShowClass = copied ? ' show' : ''

		return (
			<CopyToClipboard text={background} onCopy={this.copy}>
				<div style={{background}} className={`ColorBox${boxSizeClass}`}>
					<div style={{background}} className={`copy-overlay${shouldAddShowClass}`} />
					<div className={`copy-msg${shouldAddShowClass}`}>
						<div className={`${textColorClass}${textShadowClass}`}>Copied!!!</div>
						<div className={`${textColorClass}`}>{background}</div>
					</div>
					<div className="copy">
						<button className={`copy-btn${textColorClass}${bgColorClass}`}>Copy</button>
						<span className={`copy-color${textColorClass}`}>{this.toUpperCaseFirst(name)}</span>
					</div>
					{isColorPalettePage && (
						<Link
							to={`${location.pathname}/${id}`}
							className={`see-more${textColorClass}${bgColorClass}`}
							onClick={e => e.stopPropagation()}
						>More</Link>
					)}
				</div>
			</CopyToClipboard>
		)
	}
}

ColorBox.propTypes = {
	name: PropTypes.string.isRequired,
	format: PropTypes.string.isRequired
};

export default withRouter(ColorBox);