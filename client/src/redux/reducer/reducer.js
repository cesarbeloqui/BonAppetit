import { SOMETHING } from '../actions/types'

const initialState = {}

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SOMETHING:
			return { ...state }

		default:
			return { ...state }
	}
}

export default rootReducer
