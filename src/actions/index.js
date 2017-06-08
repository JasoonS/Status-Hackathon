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
  CREATED_GROUP: 'CREATED_GROUP'
};

export const loadPeerCoinInstanceAndUserAddress = () => {
  const provider = window.web3.currentProvider
  const contract = require('truffle-contract')
  const peerCoin = contract(PeerCoinContract)
  peerCoin.setProvider(provider)

  const web3RPC = new Web3(provider)

  return dispatch => {
    console.log('dispatched')
    web3RPC.eth.getAccounts(function(error, accounts) {
      console.log('addresses', accounts)
      dispatch(saveUserAddress(accounts[0]))
      peerCoin.deployed().then((peerCoinInstance) => {
        dispatch(savePeerCoinInstance(peerCoinInstance))
      })
    })
  }
}

export const loadUsersGroups = (peerCoinInstance) => {
  return dispatch => {
    peerCoinInstance.listGroups().then(function(result) {
      let groupData = {
        groupIDs: result[0].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupNames: result[1].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupBalance: String(result[2]).split(',')
      }
      dispatch(saveUsersGroups(groupData))
    })
  }
}

export const loadGroupDetails = (peerCoinInstance, gid) => {
  return dispatch => {
    peerCoinInstance.listGroups().then(function(result) {
      let groupData = {
        groupIDs: result[0].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupNames: result[1].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupBalance: String(result[2]).split(',')
      }
      dispatch(saveUsersGroups(groupData))
    })
  }
}

export const createGroup = (peerCoinInstance, groupNameInput, groupId, tokenName, userAddress) => {
  console.log('create group...', groupNameInput, groupId, tokenName)
  return dispatch => {
    console.log('create group...', groupNameInput, groupId, tokenName)
    dispatch(startingCreateNewGroup())
    console.log('create group...', groupNameInput, groupId, tokenName)
    peerCoinInstance.createGroup(groupNameInput, groupId/*, tokenName*/, {from: userAddress}).then(function(result) {
      // let groupData = {
      //   groupIDs: result[0].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
      //   groupNames: result[1].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
      //   groupBalance: String(result[2]).split(',')
      // }
      console.log('save new group', result)
      dispatch(saveNewGroup())
    })
  }
}

export const savePeerCoinInstance = (peerCoinInstance) => ({
  type: actions.SAVE_PEER_COIN,
  peerCoinInstance
})

export const saveUserAddress = (userAddress) => ({
  type: actions.SAVE_USER_ADDRESS,
  userAddress
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
  // windowNum
})

export const saveNewGroup = () => ({
  type: actions.CREATED_GROUP,
  // windowNum
})
