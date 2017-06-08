import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'

class CreateGroup extends Component {
  constructor(props) {
    super(props)

    this.setGroupName = this.setGroupName.bind(this)
    this.setGroupID = this.setGroupID.bind(this)
    this.setTokenName = this.setTokenName.bind(this)
    this.setTokenSymbol = this.setTokenSymbol.bind(this)

    this.state = {
      groupNameInput: '',
      groupIdInput: '',
      tokenName: '',
      tokenSymbol: '',
      isIdAvailable: true
    }
  }

  setGroupName(e) {
    const changeId = (this.state.groupNameInput === this.state.groupIdInput)
    const newGroupId = changeId? e.target.value : this.state.groupIdInput
    this.setState({
      ...this.state,
      groupNameInput: e.target.value,
      groupIdInput: newGroupId,
      isIdAvailable: changeId? true : this.state.isIdAvailable // if the ID doesn't change don't change this
    })
    if (changeId) {
      this.props.peerCoinInstance.isGroupIdUsed(newGroupId).then(result => {
        console.log('is the id available?', result)
        this.setState({
          ...this.state,
          isIdAvailable: !result
        })
      })
    }
  }
  setGroupID(e) {
    this.setState({
      ...this.state,
      groupIdInput: e.target.value,
      isIdAvailable: true
    })
    this.props.peerCoinInstance.isGroupIdUsed(e.target.value).then(result => {
      console.log('is the id available?', result)
      this.setState({
        ...this.state,
        isIdAvailable: !result
      })
    })
  }
  setTokenName(e) {
    this.setState({
      ...this.state,
      tokenName: e.target.value
    })
  }
  setTokenSymbol(e) {
    this.setState({
      ...this.state,
      tokenSymbol: e.target.value
    })
  }
  render() {
    let createGroup = () =>   this.props.dispatch(
        loadUsersGroups(this.props.peerCoinInstance, this.setGroupName, this.setGroupID, this.setTokenName)
      )
    const {
      groupNameInput,
      groupIdInput,
      tokenName,
      tokenSymbol,
      isIdAvailable
    } = this.state
    return (
      <div className="CreateGroup">
        <h1>CreateGroup</h1>

        <TextField
          floatingLabelText="Group Name"
          onChange={this.setGroupName}
          value={groupNameInput}
          fullWidth={true}
        />

        <TextField
          floatingLabelText="Group ID - this will be used to uniquely identify the group."
          onChange={this.setGroupID}
          value={groupIdInput}
          errorText={isIdAvailable? "" : "Sorry the ID " + groupIdInput + " is unavailable"}
          fullWidth={true}
        />

        <TextField
          floatingLabelText="Token Name"
          onChange={this.setTokenName}
          value={tokenName}
          fullWidth={true}
        />

        {/*<TextField
          floatingLabelText="Group ID - this will be used to uniquely identify the group."
          onChange={groupIdInput}
        />*/}

        <RaisedButton onClick={createGroup} label="Create Group" primary={true} fullWidth={true}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    screen: state.screen,
    peerCoinLoaded: state.peerCoinLoaded,
    peerCoinInstance: state.peerCoinInstance,
    groupDataLoaded: state.groupDataLoaded,
    groupData: state.groupData
   }
}

export default connect(mapStateToProps)(CreateGroup)
