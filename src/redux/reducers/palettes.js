import mockData from '../../test/mockData'

const initialState = {
	palettes: mockData
}

const palettes = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_PALETTE':
			return {
				palettes: [
					...state.palettes,
					action.newPalette
				]
			}
		default:
			return state
	}
}

export default palettes