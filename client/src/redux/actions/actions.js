import axios from 'axios'
import { SOMETHING } from '../actions/types'

export const something = (value) => {
	return {
		type: SOMETHING,
		payload: value,
	}
}
