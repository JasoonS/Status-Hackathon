pragma solidity ^0.4.8;

contract PeerCoin {

  event GroupGet(
    address indexed _from,
    bytes32 indexed _name,
    bytes32 indexed _id,
    int _ballance
  );

  struct Group {
    mapping (address => int) ballances;
    mapping (address => bool) isMember; //test if person is a member of the group
    address[] members; //an array to easily iterate through the members
    /*mapping (bytes32 => GroupBets) ballances;*/
    /*bytes32[] members; //an array to easily iterate through the bets*/
    bytes32 name;
    bool exists;
  }
  struct GroupBets {
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
  }
  struct User {
    bytes32[] groups;
    bytes32[] groupBets;
    bytes32[] groupInvites;
    mapping (bytes32 => bool) pendingInvite;
    bool exists;
  }

  mapping (bytes32 => Group) public groups;
  mapping (address => User) public users;

  function createGroup (bytes32 gname, bytes32 gid) returns (bool) {
    if(!groups[gid].exists) {
      //create group
      Group memory newGroup;

      newGroup.name = gname;
      newGroup.exists = true;

      groups[gid] = newGroup;
      groups[gid].members.push(msg.sender);
      groups[gid].isMember[msg.sender] = true;

      // Add group to the users list of groups
      addToUsersGroup(gid);

      return true;
    } else {
      return false;
    }
  }

//   function inviteUser(bytes32 gid, address newMember) {
//       if (!groups[gid].isMember[newMember]) { // TODO:: do exists check also
//           users[newMember].groupInvites.push(gid);
//           users[newMember].pendingInvite[gid] = true;
//       }
//   }

//   function acceptInvite(bytes32 gid, address newMember) {
//       if (!groups[gid].isMember[newMember] && users[newMember].pendingInvite[gid]) { // TODO:: do exists check also
//           users[newMember].groupInvites.push(gid);
//       }
//   }

  function addToUsersGroup (bytes32 gid) /*internal*/ {
    //TODO: Add more checks and security here:
    // iterate through to check if pressent? Or check in the group itself if this user is referenced in members.
    users[msg.sender].exists = true;
    users[msg.sender].groups.push(gid);
    groups[gid].isMember[msg.sender] = true;
  }

//   function invite (b)

  // TODO: Add balance int[] as a return types
  function listGroups() constant returns (bytes32[],bytes32[],int[]) {
//   function listGroups() constant returns (uint length) {
    /*uint length = people.length;*/
    uint length = users[msg.sender].groups.length;

    bytes32[] memory groupIds = new bytes32[](length);
    bytes32[] memory groupNames = new bytes32[](length);
    int[] memory ballances = new int[](length);

    // This for loop isn't too expensive because this function is 'constart'
    for (uint i = 0; i < length; i++) {
      bytes32 curGroupId = users[msg.sender].groups[i];
      Group memory curGroup;
      curGroup = groups[curGroupId];

      groupIds[i] = curGroupId;
      groupNames[i] = curGroup.name;
      ballances[i] = groups[curGroupId].ballances[msg.sender];
      GroupGet(msg.sender, curGroup.name, curGroupId, groups[curGroupId].ballances[msg.sender]);
    }
    return (groupIds, groupNames,ballances);
  }

  function sendToken(address toAdr, bytes32 gid, uint amount) returns (int ballance){
    groups[gid].ballances[msg.sender] = groups[gid].ballances[msg.sender] - int(amount);
    groups[gid].ballances[toAdr] = groups[gid].ballances[toAdr] + int(amount);
    return groups[gid].ballances[msg.sender];
  }

  function getBallance(bytes32 gid) constant returns (int balance) {
      return groups[gid].ballances[msg.sender];
  }

  //for debugging:
  function getSenderAddress() constant returns (address) {
      return msg.sender;
  }

//   function getGroupName(bytes32 id) constant returns (bytes32 name) {
//     if(!groups[id].exists)
//       throw;
//     return groups[id].name;
//   }
}

/*sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum*/
