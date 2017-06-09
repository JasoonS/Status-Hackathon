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
    case actions.SET_ACCOUNT_NUM:
      console.log('set account num', action.windowNum)
      return {
        ...state,
        accountNum: action.accountNum,
        accountIsSelected: true
      }
    case actions.SAVE_USER_ADDRESS:
      console.log('userAddress', action.userAddresses)
      return {
        ...state,
        userAddresses: action.userAddresses
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
    case actions.START_GROUP_CREATE:
      return {
        ...state,
        busyCreatingGroup: true
      }
    case actions.CREATED_GROUP:
      return {
        ...state,
        busyCreatingGroup: false
      }
    case actions.LOAD_GROUP_INVITE:
      console.log('screen', action)
      return {
        ...state,
        screen: 7,
        curGroupId: action.groupID,
        screenContext: action.screenContext
      }
    default:
      return state
  }
}

export default reducer
