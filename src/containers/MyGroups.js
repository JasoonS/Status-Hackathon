import React, { Component } from 'react';
import {loadUsersGroups} from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
          <tr key={i}>
            <td>{gID}</td>
            <td>{this.props.groupData.groupNames[i]}</td>
            <td>{this.props.groupData.groupBalance[i]}</td>
          </tr>
        )
      } else {
        return ''
      }
    }

    return (
      <div className="MyBets">
        <h1>My Groups</h1>
        <table>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Group ID</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {groups()}
          </tbody>
        </table>
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
