import {
  actions
} from '../actions'

const initialState = {
  peerCoinLoaded: false,
  groupDataLoaded: false,
  screen: 4
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SCREEN:
      console.log('set screeeeeeen', action.windowNum)
      return {
        ...state,
        screen: action.windowNum
      }
    case actions.SAVE_USER_ADDRESS:
      console.log('userAddress', action.userAddress)
      return {
        ...state,
        userAddress: action.userAddress
      }
    case actions.SAVE_PEER_COIN:
      console.log('SAVE_PEER_COIN')
      return {
        ...state,
        peerCoinLoaded: true,
        peerCoinInstance: action.peerCoinInstance
      }
    case actions.SAVE_USER_GROUPS:
      console.log('SAVE_USER_GROUPS')
      console.log(action.groupData)
      return {
        ...state,
        groupData: action.groupData,
        groupDataLoaded: true
      }
    default:
      return state
  }
}

export default reducer
