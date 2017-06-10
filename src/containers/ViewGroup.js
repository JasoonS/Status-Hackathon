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
import RaisedButton from 'material-ui/RaisedButton'


export default class ViewGroup extends Component {
  render() {
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
        <h1>ViewGroup</h1>
        <RaisedButton onTouchTap={() => console.log('inviteFriends')} label='Invite Friends' primary={true} fullWidth={true}/>
        <br />
        <br />
        <RaisedButton onTouchTap={() => console.log('createBet')} label='Create Bet' primary={true} fullWidth={true}/>
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
