import React, { Component } from 'react'
import PeerCoinContract from '../build/contracts/PeerCoin.json'
import Config from '../truffle.js'
import Web3 from 'web3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.createGroup = this.createGroup.bind(this)
    this.setInputId = this.setInputId.bind(this)
    this.setInputGroup = this.setInputGroup.bind(this)

    this.state = {
      groupNameInput: '',
      groupIdInput: '',
      pageId: 'home'
    }
  }

  componentWillMount() {
  }

  createGroup() {
    console.log('create group')
    var self = this

    var {host, port} = Config.networks[process.env.NODE_ENV]
    const provider = (typeof window.web3 == 'undefined')?
                      new Web3.providers.HttpProvider('http://' + host + ':' + port)
                      : window.web3.currentProvider
    const contract = require('truffle-contract')
    const peerCoin = contract(PeerCoinContract)
    peerCoin.setProvider(provider)

    const web3RPC = new Web3(provider)

    var peerCoinInstance

    console.log('before get accounts')
    web3RPC.eth.getAccounts(function(error, accounts) {
      console.log('in get accounts', accounts)
      peerCoin.deployed().then(function(instance) {
        peerCoinInstance = instance
        console.log('adding',self.state.groupIdInput, self.state.groupNameInput)
        return peerCoinInstance.addGroup(self.state.groupIdInput, self.state.groupNameInput, {from: accounts[0]})
      }).then(function(a) {
        peerCoinInstance.getGroupName(self.state.groupIdInput).then(function(result) {
          console.log( window.web3.toAscii(result))
        })
      })
    })
    console.log('after get accounts')
  }

  setInputGroup(e) {
    this.setState({
      ...this.state,
      groupNameInput: e.target.value
    })
  }

  setInputId(e) {
    this.setState({
      ...this.state,
      groupIdInput: e.target.value
    })
  }

  render() {
    return (
        <div className="App test">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">BeerBot</a>
          <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Groups</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Tokens</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">FAQ</a></li>
          </ul>
          </nav>
            <main className="container">
                <div className="pure-g">
                  <div className="pure-u-1-1">
                    <p>
                      BeerBot manages a bet or an exchange between you and your friends.
                    </p>
                    <div>
                      <input placeholder={'Group Name'} value={this.state.groupNameInput} onChange={this.setInputGroup}/>
                      <input placeholder={'Group ID'} value={this.state.groupIdInput} onChange={this.setInputId}/><br/>
                      <button onClick={this.createGroup}>Create Group</button>
                    </div>
                  </div>
                </div>
            </main>
        </div>);
  }
}

export default App
