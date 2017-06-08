import React, { Component } from 'react'
import {loadUsersGroups} from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class MyGroups extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log('saving load user groups')
    this.props.dispatch(
      loadUsersGroups(this.props.peerCoinInstance)
    )
  }

  render() {
    const groups = () => {
      if (this.props.groupDataLoaded){
        // const {groupData: {groupIDs, groupNames, groupBalance}} = this.props.groupData
        return this.props.groupData.groupIDs.map((gID, i) =>
          <TableRow key={i}>
            <TableRowColumn>{gID}</TableRowColumn>
            <TableRowColumn>{this.props.groupData.groupNames[i]}</TableRowColumn>
            <TableRowColumn>{this.props.groupData.groupBalance[i]}</TableRowColumn>
            <TableRowColumn><RaisedButton label="View" primary={true} /></TableRowColumn>
          </TableRow>
        )
      } else {
        return ''
      }
    }

    return (
      <div className="MyBets">
        <h1>My Groups</h1>
        <p>The following are groups you belong to as well as group invites.</p>
        <div>
          <Table height='300px'>
            <TableHeader>
              <TableRow>
              <TableHeaderColumn tooltip="The Group ID">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Your Balance in Group">Balance</TableHeaderColumn>
                <TableHeaderColumn tooltip="View Group Details">View</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} displayRowCheckbox={false}>
              {groups()}
            </TableBody>
          </Table>
        </div>
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

export default connect(mapStateToProps)(MyGroups)
