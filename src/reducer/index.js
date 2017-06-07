import {
  SET_SCREEN
} from '../actions'

const initialState = {
  // userInfo: {
  //   accountNumber: "",
  //   loggedIn: false,
  // },
  // accountInfo: {
  //   payments: [],
  //   // {
  //   //   to:
  //   //   time:
  //   //   amount:
  //   //   message:
  //   //   category:
  //   // }
  //   payments: [],
  //   // {
  //   //   from:
  //   //   (NO)time:
  //   //   amount:
  //   //   message:
  //   //   (NO)category:
  //   // }
  //   accounts: [],
  // },
  screen: 0
  // 0 - overview
  // 1 - pay
  // 2 - request
  // 3 - insigts
  // 4 - transactions history
  // 5 - payment requests
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN:
      console.log('set screeeeen', action.windowNum)
      return {
        ...state,
        screen: action.windowNum
      }
    default:
      return state
  }
}

export default reducer
