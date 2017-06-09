import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class InveteFriends extends Component {
  constructor(props) {
    super(props)

    // this.setGroupName = this.setGroupName.bind(this)

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
      curGroupId,
      userAddresses
    } = this.props

    console.log('userAddresses')
    console.log(userAddresses)
    // TODO: add a filter, don't show your own address.
    const friends = userAddresses.map((address, i) =>
          <TableRow key={i}>
            <TableRowColumn>{i}</TableRowColumn>
            <TableRowColumn>{address}</TableRowColumn>
          </TableRow>
        )
    console.log('the screen context', screenContext)
    return (
      <div className='InveteFriends'>
        <h1>Invite Friends</h1>
        {(screenContext === 'createdGroup') ? <p>You have just created a group, why not invite some friends to join, just enter their unique address.</p> : ''}
        <p>Invite friends to join your group: @{curGroupId}</p>
        <Table height='300px' onRowSelection={(a) => console.log('selected row', a)} multiSelectable={true}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="The Group ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Friend Address">Friend Address</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={true}>
            {friends}
          </TableBody>
        </Table>
        <RaisedButton onClick={inviteFriends} label='Invite Selected Friends' primary={true} fullWidth={true}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    screenContext: state.screenContext,
    curGroupId: state.curGroupId,
    userAddresses: state.userAddresses
   }
}

export default connect(mapStateToProps)(InveteFriends)
