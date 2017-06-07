import {
  actions
} from '../actions'

const initialState = {
  peerCoinLoaded: false,
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
    case actions.SAVE_PEER_COIN:
      console.log('SAVE_PEER_COIN')
      return {
        ...state,
        peerCoinLoaded: true,
        peerCoinInstance: action.peerCoinInstance
      }
    default:
      return state
  }
}

export default reducer
