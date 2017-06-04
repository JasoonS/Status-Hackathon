pragma solidity ^0.4.8;

import "./util/SafeMath.sol";

contract PeerCoin {
  struct Group {
    /*mapping (address => int) ballances*/
    /*mapping (string => GroupBets) ballances
    mapping (string => GroupBets) ballances*/
    bytes32 name;
    bool exists;
  }
  /*struct GroupBets {
    mapping (address => int) ballances
    mapping (address => int) ballances
    bytes32 name;
    bool exists;
  }
  struct But {

  }*/

  mapping (bytes32 => Group) groups;

  function addGroup (bytes32 id, bytes32 name) returns (bool success){
    if(!groups[id].exists) {
      Group memory newGroup;

      newGroup.name = name;
      newGroup.exists = true;

      groups[id] = newGroup;
      return true;
    } else {
      return false;
    }
  }

  function getGroupName(bytes32 id) constant returns (bytes32 name) {
    if(!groups[id].exists)
      throw;

    return groups[id].name;
  }

  function getPeople() constant returns (bytes32) {
    return 'happy-people';
  }
}

/*sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum*/
