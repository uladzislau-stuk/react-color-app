import React from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss'

const toUpperCaseFirst = (word) => word[0].toUpperCase() + word.slice(1)

const ColorBox = ({ name, color, copyToClipboard: CopyToClipboard }) => {
	return (
		<CopyToClipboard text={color}>
			<div style={{ background: color }} className="ColorBox">
				<div className="copy">
					<div className="copy-notification">Copied!!!</div>
					<div className="copy-content">{color}</div>
					<button className="copy-btn">Copy</button>
				</div>
				<span className="see-more">More</span>
				<span className="color-name">{toUpperCaseFirst(name)}</span>
			</div>
		</CopyToClipboard>
	);
};

ColorBox.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired
};

export default ColorBox;