import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'

class InveteFriends extends Component {
  constructor(props) {
    super(props)

    this.setGroupName = this.setGroupName.bind(this)

    this.state = {
      invites: []
    }
  }
  render() {
    const {
      invites
    } = this.state
    const {
      screenContext,
      curGroup
    } = this.props
    console.log('the screen context', screenContext)
    return (
      <div className='InveteFriends'>
        <h1>Invite Friends</h1>
        {(screenContext === 'createdGroup') ? <p>You have just created a group, why not invite some friends to join, just enter their unique address.</p> : ''}
        <p>Ivitie friends to join your group: @{curGroup}</p>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    screenContext: state.screenContext,
    curGroup: state.curGroup
   }
}

export default connect(mapStateToProps)(InveteFriends)
