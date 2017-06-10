import React, { Component } from 'react';
import { connect } from 'react-redux'

class CreateBet extends Component {
  render() {
    return (
      <div className="CreateBet">
        <h1>Create Bet</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    curGroupId: state.curGroupId
   }
}
export default connect(mapStateToProps)(CreateBet)
