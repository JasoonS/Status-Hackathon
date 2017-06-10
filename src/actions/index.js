import PeerCoinContract from '../../build/contracts/PeerCoin.json'
import Config from '../../truffle.js'
import Web3 from 'web3'

export const actions = {
  CUSTOM_ACTION: 'CUSTOM_ACTION',
  SET_SCREEN: 'SET_SCREEN',
  SAVE_PEER_COIN: 'SAVE_PEER_COIN',
  SAVE_USER_GROUPS: 'SAVE_USER_GROUPS',
  START_GROUP_CREATE: 'START_GROUP_CREATE',
  SAVE_USER_ADDRESS: 'SAVE_USER_ADDRESS',
  LOAD_GROUP_INVITE: 'LOAD_GROUP_INVITE',
  SET_ACCOUNT_NUM: 'SET_ACCOUNT_NUM',
  START_INVITE: 'START_INVITE',
  FINISH_INVITE: 'FINISH_INVITE',
  VIEW_GROUP: 'VIEW_GROUP',
  CREATE_BET_PAGE: 'CREATE_BET_PAGE',
  LOAD_BETS_LIST: 'LOAD_BETS_LIST',
  LOAD_GBETS_LIST: 'LOAD_GBETS_LIST',
  LOAD_GROUP_INFO: 'LOAD_GROUP_INFO',
  CREATED_GROUP: 'CREATED_GROUP'
};

export const loadPeerCoinInstanceAndUserAddress = () => {
  var {host, port} = Config.networks[process.env.NODE_ENV]
  const provider = new Web3.providers.HttpProvider('http://' + host + ':' + port)
  // const provider = window.web3.currentProvider
  const contract = require('truffle-contract')
  const peerCoin = contract(PeerCoinContract)
  peerCoin.setProvider(provider)

  const web3RPC = new Web3(provider)

  return dispatch => {
    console.log('dispatched')
    web3RPC.eth.getAccounts(function(error, accounts) {
      console.log('addresses', accounts)
      dispatch(saveUserAddresses(accounts))
      peerCoin.deployed().then((peerCoinInstance) => {
        dispatch(savePeerCoinInstance(peerCoinInstance))
      })
    })
  }
}

export const loadUsersGroups = (peerCoinInstance, account) => {
  return dispatch => {
    peerCoinInstance.listGroups(account).then(function(result) {
      let groupData = {
        groupIDs: result[0].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupNames: result[1].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupBalance: String(result[2]).split(',')
      }
      dispatch(saveUsersGroups(groupData))
    })
  }
}

export const loadUsersBets = (peerCoinInstance, account) => {
  return dispatch => {
    peerCoinInstance.listBets(account).then(function(result) {
      console.log(result)
      let betData = {
        positions: result[0],
        amount: String(result[1]).split(','),
        id: result[2].map(i => window.web3.toAscii(i).replace(/\u0000/g, ''))
      }
      console.log(betData)
      dispatch(saveLoadBetsList(betData))
    })
  }
}

export const loadGroupsBets = (peerCoinInstance, gid) => {
  return dispatch => {
    peerCoinInstance.listBetsByGID(gid).then(function(result) {
      let betData = {
        id: result/*[0]*/.map(i => window.web3.toAscii(i).replace(/\u0000/g, ''))
      }
      dispatch(saveGroupBetsList(betData))
    })
  }
}

export const loadGroupInfo = (peerCoinInstance, gid) => {
  return dispatch => {
    peerCoinInstance.getGroupInfo(gid).then(function(result) {
      console.log(result)
      let betData = {
        // id: result[0].map(i => window.web3.toAscii(i).replace(/\u0000/g, ''))
        address: result[1],
        balance: String(result[2]).split(',')
      }
      console.log(betData)
      dispatch(saveGroupInfo(betData))
    })
  }
}

export const inviteUsers = (peerCoinInstance, gid, userAddresses, accountNum, usersIndexList) => {
  return dispatch => {
    startInviting()
    let totalLength = usersIndexList.length
    console.log('invite users:', usersIndexList, totalLength)
    console.log('invite users:', userAddresses)
    console.log('invite users:', usersIndexList)
    console.log('invite users:', accountNum)
    console.log('invite users:', userAddresses[usersIndexList[1]])
    console.log('invite users:', gid)
    usersIndexList.map((i) =>
      {
        console.log('mapping...', i)
        console.log('mapping...', gid, userAddresses[i])
        peerCoinInstance.inviteUser(gid, userAddresses[i], {from: userAddresses[accountNum], gas:3000000}).then(function(result) {
        if ((--totalLength) <= 0)
          dispatch(finishInviting(gid)) // TODO :: left out because no need to over complicate things.
        console.log('done with dispatch', (totalLength))
      })}
    )
  }
}

export const loadOpenBets = (peerCoinInstance, gid) => {
  return dispatch => {
    // dispatch(viewGroup(gid))
    peerCoinInstance.getGroupInfo(gid).then(function(result) {
      console.log(result)
      // dispatch(saveLoadBetsList(groupData))
    })
  }
}
export const loadGroupDetails = (peerCoinInstance, gid) => {
  return dispatch => {
    dispatch(viewGroup(gid))
    peerCoinInstance.getGroupInfo(gid).then(function(result) {
      console.log(result)
      // let groupData = {
      //   groupIDs: result[0].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
      //   groupNames: result[1].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
      //   groupBalance: String(result[2]).split(',')
      // }
      // dispatch(saveUsersGroups(groupData))
    })
  }
}

export const createGroup = (peerCoinInstance, groupNameInput, groupId, tokenName, userAddresses, accountIndex) => {
  return dispatch => {
    dispatch(startingCreateNewGroup())
    peerCoinInstance.createGroup(groupNameInput, groupId/*, tokenName*/, {from: userAddresses[accountIndex], gas:3000000}).then(function(result) {
      dispatch(finishCreateGroup())
      dispatch(loadGroupInvites(groupId, 'createdGroup'))
    })
  }
}

export const setAccountNum = (accountNum) => ({
  type: actions.SET_ACCOUNT_NUM,
  accountNum
})

export const saveLoadBetsList = (openBetsInfo) => ({
  type: actions.LOAD_BETS_LIST,
  openBetsInfo
})

export const saveGroupInfo = (groupInfo) => ({
  type: actions.LOAD_GROUP_INFO,
  groupInfo
})

export const saveGroupBetsList = (groupBetsInfo) => ({
  type: actions.LOAD_GBETS_LIST,
  groupBetsInfo
})

// currently inactive...
export const startInviting = () => ({ // TODO: using a counter to tell when inviting is done is very hacky... Fix
  type: actions.START_INVITE
})

export const finishInviting = (gid) => ({ // TODO: using a counter to tell when inviting is done is very hacky... Fix
  type: actions.FINISH_INVITE,
  gid
})

// export const inviteUser = (userAddresses) => ({
//   type: actions.START_INVITE,
//   userAddresses
// })

export const savePeerCoinInstance = (peerCoinInstance) => ({
  type: actions.SAVE_PEER_COIN,
  peerCoinInstance
})

export const saveUserAddresses = (userAddresses) => ({
  type: actions.SAVE_USER_ADDRESS,
  userAddresses
})

export const saveUsersGroups = (groupData) => ({
  type: actions.SAVE_USER_GROUPS,
  groupData: groupData
})

export const setScreen = windowNum => ({
  type: actions.SET_SCREEN,
  windowNum
})

export const startingCreateNewGroup = () => ({
  type: actions.START_GROUP_CREATE,
})

export const finishCreateGroup = () => ({
  type: actions.CREATED_GROUP
})

export const viewGroup = (curGroupId) => ({
  type: actions.VIEW_GROUP,
  curGroupId
})

export const goToCreateBet = (curGroupId) => ({
  type: actions.CREATE_BET_PAGE,
  curGroupId
})

export const loadGroupInvites = (groupID, screenContext) =>{
  console.log('test', screenContext)
  return ({
    type: actions.LOAD_GROUP_INVITE,
    groupID,
    screenContext
  })
}
