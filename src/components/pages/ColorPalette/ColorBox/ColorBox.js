import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
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

		return (
			<CopyToClipboard text={background} onCopy={this.copy}>
				<div style={{background}} className={`ColorBox${isColorPalettePage ? " size-s" : " size-l"}`}>
					<div style={{background}} className={`copy-overlay${copied ? " show": ""}`} />
					<div className={`copy-msg${copied ? " show" : ""}`}>
						<div>Copied!!!</div>
						<div>{background}</div>
					</div>
					<div className="copy">
						<button className="copy-btn">Copy</button>
						<span className="copy-color">{this.toUpperCaseFirst(name)}</span>
					</div>
					{isColorPalettePage && (
						<Link
							to={`${location.pathname}/${id}`}
							className="see-more"
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