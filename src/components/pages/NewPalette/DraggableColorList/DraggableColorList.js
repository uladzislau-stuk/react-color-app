import React from 'react'
import { DraggableColorBox } from "../"
import { SortableContainer } from "react-sortable-hoc"
import uuid from "uuid/v4"

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
	return (
		<div style={{ height: "100%" }}>
			{colors.map((color, idx) => (
				<DraggableColorBox
					index={idx}
					key={uuid()}
					color={color.color}
					name={color.name}
					deleteColor={() => deleteColor(color.name)}
				/>
			))}
		</div>
	)
})

export default DraggableColorList