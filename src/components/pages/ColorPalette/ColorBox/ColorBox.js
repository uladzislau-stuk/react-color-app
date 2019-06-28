import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
		const { name, color: background } = this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background} onCopy={this.copy}>
				<div style={{background}} className="ColorBox">
					<div style={{background}} className={`copy-overlay${copied ? " show": ""}`} />
					<div className={`copy-msg${copied ? " show" : ""}`}>
						<div>Copied!!!</div>
						<div>{background}</div>
					</div>
					<div className="copy">
						<button className="copy-btn">Copy</button>
					</div>
					<span className="see-more">More</span>
					<span className="color-name">{this.toUpperCaseFirst(name)}</span>
				</div>
			</CopyToClipboard>
		);
	}
}

ColorBox.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired
};

export default ColorBox;