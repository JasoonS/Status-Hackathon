import React, { Component } from 'react'
import PeerCoinContract from '../build/contracts/PeerCoin.json'
import Config from '../truffle.js'
import { connect } from 'react-redux'
import Web3 from 'web3'
import './App.css'
import SideBar from './containers/SideBar.js'
import BotInstructions from './components/BotInstructions.js'
import HowItWorks from './components/HowItWorks.js'
import CreateGroup from './containers/CreateGroup.js'
import Home from './containers/Home.js'
import MyGroups from './containers/MyGroups.js'
import MyBets from './containers/MyBets.js'
import Tokens from './containers/Tokens.js'
import {createSampleGroups} from './test/testTruffle.js'
import {loadPeerCoinInstance} from './actions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(
      loadPeerCoinInstance()
    )
  }

  render() {
    const displayMainWindow = () => {
      console.log("you are on screen:", this.props.screen)
      if (this.props.screen == 0)
        return <Home />
      else if(this.props.screen == 1)
          return <HowItWorks />
      else if(this.props.screen == 2)
          return <MyGroups />
      else if (this.props.screen == 3)
        return <MyBets />
      else if(this.props.screen == 4)
        return <CreateGroup />
      else if(this.props.screen == 5)
          return <Tokens /> //TODO:: rename this to TokenInfo
      else if(this.props.screen == 6)
          return <BotInstructions />
    }
    return (
      // <a className={classNames({'side-button': true, 'left': true, 'active': this.state.side === 'left'})} onClick={this.changeSide.bind(this, 'left')}>Left</a>
      // <a className={classNames({'side-button': true, 'right': true, 'active': this.state.side === 'right'})} onClick={this.changeSide.bind(this, 'right')}>Right</a>
      <div id="outer-container" style={{height: '100%'}}>
        <SideBar/>
        <main id="page-wrap">
          {displayMainWindow()}
        </main>
      </div>
    )
    // {buttons}
    // <div id={ "outer-container" }>
    // <SideBar/>
    // <div id="page-wrap">
    // </div>
    // </div>
  }
}

const mapStateToProps = state => {
  const { screen } = state

  return {
    screen
  }
}

export default connect(mapStateToProps)(App)
