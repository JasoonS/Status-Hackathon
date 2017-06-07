// import { nameOfAnimation as Menu } from 'react-burger-menu'
//
// class Example extends React.Component {
//   showSettings (event) {
//     event.preventDefault();
//   }
//
//   render () {
//     return (
//       <Menu>
//         <a id="home" className="menu-item" href="/">Home</a>
//         <a id="about" className="menu-item" href="/about">About</a>
//         <a id="contact" className="menu-item" href="/contact">Contact</a>
//         <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
//       </Menu>
//     );
//   }
// }
import { bubble as Menu } from 'react-burger-menu'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setScreen } from '../actions'
// import Picker from '../components/Picker'
// import Posts from '../components/Posts'

// import './sidebarstyle.css'


class SideBar extends Component {
  static propTypes = {

  }

  render() {
    // <MenuWrap wait={20} side="right">
    return (
        <Menu id="page-wrap" right>
          <a id="about" onClick={() => this.props.setScreen(0)} className="menu-item" >overview</a>
          <a id="home" onClick={() => this.props.setScreen(1)} className="menu-item" >Pay</a>
          <a id="contact" onClick={() => this.props.setScreen(2)} className="menu-item" >Request</a>
          <a id="nth" onClick={() => this.props.setScreen(3)} className="menu-item" >Transactions History</a>
          <a id="ntnth" onClick={() => this.props.setScreen(4)} className="menu-item" >Accounts</a>
          <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        </Menu>
    )
    // </MenuWrap>
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(
  mapStateToProps,
  {setScreen}
)(SideBar)
