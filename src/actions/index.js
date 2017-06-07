import PeerCoinContract from '../../build/contracts/PeerCoin.json'
import Config from '../../truffle.js'
import Web3 from 'web3'

export const actions = {
  CUSTOM_ACTION: 'CUSTOM_ACTION',
  SET_SCREEN: 'SET_SCREEN',
  SAVE_PEER_COIN: 'SAVE_PEER_COIN',
  SAVE_USER_GROUPS: 'SAVE_USER_GROUPS'
};

export const loadPeerCoinInstance = () => {
  const provider = window.web3.currentProvider
  const contract = require('truffle-contract')
  const peerCoin = contract(PeerCoinContract)
  peerCoin.setProvider(provider)

  const web3RPC = new Web3(provider)

  return dispatch => {
    console.log('dispatched')
    peerCoin.deployed().then((peerCoinInstance) => {
      dispatch(savePeerCoinInstance(peerCoinInstance))
    })
  }
}

export const loadUsersGroups = (peerCoinInstance) => {
  return dispatch => {
    console.log('dispatched')
    peerCoinInstance.listGroups().then(function(result) {
      console.log(result)
      console.log('this is the result')
      let groupData = {
        groupIDs: result[0].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupNames: result[1].map(i => window.web3.toAscii(i).replace(/\u0000/g, '')),
        groupBalance: String(result[2]).split(',')
      }
      console.log("the result...")
      console.log(groupData)
      dispatch(saveUsersGroups(groupData))
      console.log("done")
    })
  }
}

export const savePeerCoinInstance = (peerCoinInstance) => ({
  type: actions.SAVE_PEER_COIN,
  peerCoinInstance
})

export const saveUsersGroups = (groupData) => {
  console.log('the group haz some data:', groupData)

  return ({
    type: actions.SAVE_USER_GROUPS,
    groupData: groupData
  })
}

export const setScreen = windowNum => {
  console.log("set Screeennn!!!", windowNum)
  return ({
  type: actions.SET_SCREEN,
  windowNum
})}
