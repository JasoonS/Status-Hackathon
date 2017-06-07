import React, { Component } from 'react'
import { connect } from 'react-redux'
// import './App.css'
import SideBar from './containers/SideBar.js'
import BotInstructions from './components/BotInstructions.js'
import HowItWorks from './components/HowItWorks.js'
import CreateGroup from './containers/CreateGroup.js'
import Home from './containers/Home.js'
import MyGroups from './containers/MyGroups.js'
import MyBets from './containers/MyBets.js'
import Tokens from './containers/Tokens.js'
import {loadPeerCoinInstance} from './actions'
import PropTypes from 'prop-types'

class App extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    peerCoinLoaded: PropTypes.bool,
    screen: PropTypes.number
  }

  componentWillMount() {
    this.props.dispatch(
      loadPeerCoinInstance()
    )
  }

  render() {
    const displayMainWindow = () => {
      if (this.props.peerCoinLoaded) {
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
      } else {
        return (
          <p>Wating to sync to the contract on the network.</p>
        )
      }
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
  return {
    screen: state.screen,
    peerCoinLoaded: state.peerCoinLoaded
   }
}

export default connect(mapStateToProps)(App)
