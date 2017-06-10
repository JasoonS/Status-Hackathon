import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {loadGroupInvites, goToCreateBet} from '../actions'

class ViewGroup extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      curGroupId,
      dispatch
    } = this.props
    const inviteFriendsBtn = () => {
      dispatch(loadGroupInvites(curGroupId, 'viewGroup'))
    }
    const createGroupBtn = () => {
      dispatch(goToCreateBet(curGroupId))
    }
    const openBets = ['a','b'].map((id, i) =>
      <TableRow key={i} >
        <TableRowColumn>{id}</TableRowColumn>
        <TableRowColumn>{id}</TableRowColumn>
      </TableRow>
    )
    const groupMembers = ['mem1','mem2'].map((id, i) =>
      <TableRow key={i} >
        <TableRowColumn>{id}</TableRowColumn>
        <TableRowColumn>{id}</TableRowColumn>
      </TableRow>
    )
    return (
      <div className="ViewGroup">
        <h1>View Group @{curGroupId}</h1>
        <RaisedButton onTouchTap={inviteFriendsBtn} label='Invite Friends' primary={true} fullWidth={true}/>
        <br />
        <br />
        <RaisedButton onTouchTap={createGroupBtn} label='Create Bet' primary={true} fullWidth={true}/>
        <br />
        <br />
        {/*table for active bets*/}
        <Table onRowSelection={this.selectFriends} displayRowCheckbox={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="The Group ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Friend Address">Friend Address</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={true}>
            {openBets}
          </TableBody>
        </Table>
        {/*table for users groups*/}
        <h3>Group Members</h3>
        <Table height='300px' onRowSelection={this.selectFriends} displayRowCheckbox={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="User Address">User</TableHeaderColumn>
              <TableHeaderColumn tooltip="Users Balance">Balance</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={true}>
            {groupMembers}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    curGroupId: state.curGroupId
   }
}
export default connect(mapStateToProps)(ViewGroup)
