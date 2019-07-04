import React from 'react'
import './GoBackBox.scss'
import { Link } from 'react-router-dom'

function GoBackBox(props) {
	return (
		<div className="GoBackBox">
			<Link to={props.prevUrl} className="GoBackBox-btn">Go Back</Link>
		</div>
	);
}

export default GoBackBox