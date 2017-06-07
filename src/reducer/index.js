import {
  actions
} from '../actions'

const initialState = {
  screen: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SCREEN:
      console.log('set screeeeeeen', action.windowNum)
      return {
        ...state,
        screen: action.windowNum
      }
    default:
      return state
  }
}

export default reducer
