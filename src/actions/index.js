import PeerCoinContract from '../../build/contracts/PeerCoin.json'
import Config from '../../truffle.js'
import Web3 from 'web3'

export const actions = {
  CUSTOM_ACTION: 'CUSTOM_ACTION',
  SET_SCREEN: 'SET_SCREEN',
  SAVE_PEER_COIN: 'SAVE_PEER_COIN'
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
export const savePeerCoinInstance = (peerCoinInstance) => ({
  type: actions.SAVE_PEER_COIN,
  peerCoinInstance
})

// export customAction() => ({
//    type: actions.CUSTOM_ACTION
// })

export const setScreen = windowNum => {
  console.log("set Screeennn!!!", windowNum)
  return ({
  type: actions.SET_SCREEN,
  windowNum
})}
