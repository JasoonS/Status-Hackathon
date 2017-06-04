pragma solidity ^0.4.8;

import "./util/SafeMath.sol";

contract PeerCoin {
  struct Group {
    /*mapping (address => int) ballances;*/
    address[] members; //an array to easily iterate through the members
    /*mapping (bytes32 => GroupBets) ballances;*/
    /*bytes32[] members; //an array to easily iterate through the bets*/
    bytes32 name;
    bool exists;
  }
  /*struct GroupBets {
    mapping (address => Bet) bets;
    address[] participants;
    bytes32 name;
    bytes32 description;
    bool exists;
  }
  struct Bet {
    bool stance;
    uint amount;
    bool exists;
  }*/
  struct User {
    bytes32[] groups;
    bytes32[] groupBets;
    bool exists;
  }

  mapping (bytes32 => Group) groups;
  mapping (address => User) users;

  function createGroup (bytes32 id, bytes32 name) returns (bool success){
    if(!groups[id].exists) {
      //create group
      Group memory newGroup;

      newGroup.name = name;
      newGroup.exists = true;

      groups[id] = newGroup;
      groups[id].members.push(msg.sender);

      // Add group to the users list of groups
      /*addToUsersGroup(id);*/

      return true;
    } else {
      return false;
    }
  }

  function addToUsersGroup (bytes32 id) internal {
    //TODO: Add more checks and security here:
    // iterate through to check if pressent? Or check in the group itself if this user is referenced in members.
    users[msg.sender].exists = true;
    users[msg.sender].groups.push(id);
  }

  // TODO: Add balance int[] as a return types
  function listGroups(address askAddress) constant returns (bytes32[],bytes32[]) {
    /*uint length = people.length;*/
    uint length = users[askAddress].groups.length;

    bytes32[] memory groupIds = new bytes32[](length);
    bytes32[] memory groupNames = new bytes32[](length);
    /*int[] memory ballances = new int[](length);*/

    // This for loop isn't too expensive because this function is 'constart'
    for (uint i = 0; i < length; i++) {
      bytes32 curGroupId = users[askAddress].groups[i];
      Group memory curGroup;
      curGroup = groups[curGroupId];

      groupIds[i] = curGroupId;
      groupNames[i] = curGroup.name;
      /*ballances[i] = curGroup.ballances[msg.sender];*/
    }
    return (groupIds, groupNames);
  }

  function getGroupName(bytes32 id) constant returns (bytes32 name) {
    if(!groups[id].exists)
      throw;

    return groups[id].name;
  }
}

/*sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum*/
