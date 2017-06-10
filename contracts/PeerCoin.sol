pragma solidity ^0.4.8;

contract PeerCoin {

  event GroupGet(
    address indexed _from,
    bytes32 indexed _name,
    bytes32 indexed _id,
    int _balance
  );

  struct Group {
    mapping (address => int) balances;
    mapping (address => bool) isMember; //test if person is a member of the group
    address[] members; //an array to easily iterate through the members
    mapping (bytes32 => GroupBets) groupBets;
    bytes32[] groupBetsArray;
    bytes32[] bets;
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
    bool isOpen;
    bool exists;
  }
  struct User {
    bytes32[] groups;
    bytes32[] groupBets;
    bytes32[] groupInvites;
    mapping (bytes32 => bool) pendingInvite;
    uint numberOfPendingBets; //Ugly but it had to be done
    bool exists;
  }

  mapping (bytes32 => Group) public groups;
  mapping (address => User) public users;

  modifier onlyGroupMember(bytes32 gid) {
    if (!groups[gid].isMember[msg.sender]) {
      throw;
    }
    _;
  }

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

  function listAllInvitiations(address addr) returns (bytes32[] invitations){
        return users[addr].groupInvites;
  }

  function listPendingInvites(address addr) returns (bytes32[] memory invitations){
      invitations = new bytes32[](users[addr].numberOfPendingBets);
      uint count = 0;
      bytes32[] memory allInvites = listAllInvitiations(addr);
      for(uint i = 0; i < allInvites.length; i++){
          if(users[addr].pendingInvite[allInvites[i]]){
            invitations[count++] = (allInvites[i]);
          }
      }
  }

  mapping (address => Bet) bets;
    address[] participants;
    bytes32 name;
    bytes32 description;
    bool exists;

  function addBetGroup (bytes32 bgname, bytes32 bgdescription, bytes32 gid) returns( bool ){
    assert(groups[gid].exists);
    if(groups[gid].groupBets[bgname].exists){
        //bet group allready exists inside of the group
        return false;
    }
    users[msg.sender].groupBets.push(bgname);
    groups[gid].groupBets[bgname].exists = true;
    groups[gid].groupBets[bgname].name = bgname;
    groups[gid].groupBets[bgname].description = bgdescription;
    groups[gid].groupBetsArray.push(bgname);
    return true;
  }

  //function that takes in a group, the bet name and the bet description and creates the bet
  //returning the ID of the bet
  function addBet(bytes32 bgid, bytes32 gid, bool bstance, uint bamount) {
      Group group = groups[gid]; //gets the group
      assert(group.isMember[msg.sender]);

      //creates the bet
      group.groupBets[bgid].bets[msg.sender].stance = bstance;
      group.groupBets[bgid].bets[msg.sender].amount = bamount;
      group.groupBets[bgid].bets[msg.sender].isOpen = true;
      group.groupBets[bgid].bets[msg.sender].exists = true;
      group.groupBets[bgid].participants.push(msg.sender);
      groups[gid].balances[msg.sender] -= int(bamount);
      groups[gid] = group;
  }

  function isGroupIdUsed (bytes32 gid) constant returns( bool ) {
    return groups[gid].exists;
  }

  function addToUsersGroup (bytes32 gid) internal {
    //TODO: Add more checks and security here:
    // iterate through to check if pressent? Or check in the group itself if this user is referenced in members.
    users[msg.sender].exists = true;
    users[msg.sender].groups.push(gid);
    groups[gid].isMember[msg.sender] = true;
  }

  function getGroupInfo (bytes32 gid) constant returns (bytes32[] _bets, address[] _members, int[] _balances){
    uint length = groups[gid].members.length;
    int[] memory balances = new int[](length);
    for (uint i = 0; i < length; i++) {
      address curMember = groups[gid].members[i];

      balances[i] = groups[gid].balances[curMember];
    }
    return (groups[gid].bets, groups[gid].members, balances);
  }

  function inviteUser (bytes32 gid, address newMember) onlyGroupMember(gid) {
    users[newMember].numberOfPendingBets++;
    users[newMember].groupInvites.push(gid);
    users[newMember].pendingInvite[gid] = true;
    users[newMember].groupInvites.push(gid); // This should really be stored on a central server, not a good solution using an array like this.
    // Rather store in a server, and check with the previous line if they have an account.
    // this append only, so not scalable if user joins many many groups.
  }

  function acceptInvite(bytes32 gid) {
    if (!groups[gid].isMember[msg.sender] && users[msg.sender].pendingInvite[gid]) { // TODO:: do exists check also
      users[msg.sender].pendingInvite[gid] = true;
      users[msg.sender].numberOfPendingBets--;
    }
  }

  // TODO: Add balance int[] as a return types
  function listGroups(address uaddr) constant returns (bytes32[],bytes32[],int[]) {
//   function listGroups() constant returns (uint length) {
    /*uint length = people.length;*/
    uint length = users[uaddr].groups.length;

    bytes32[] memory groupIds = new bytes32[](length);
    bytes32[] memory groupNames = new bytes32[](length);
    int[] memory balances = new int[](length);

    // This for loop isn't too expensive because this function is 'constart'
    for (uint i = 0; i < length; i++) {
      bytes32 curGroupId = users[uaddr].groups[i];
      Group memory curGroup;
      curGroup = groups[curGroupId];

      groupIds[i] = curGroupId;
      groupNames[i] = curGroup.name;
      balances[i] = groups[curGroupId].balances[uaddr];
      /*GroupGet(uaddr, curGroup.name, curGroupId, groups[curGroupId].balances[uaddr]);*/
    }
    return (groupIds, groupNames,balances);
  }

  function listBetsByGID(bytes32 gid) returns (bytes32[] groupBet) {
      Group group = groups[gid];
      groupBet = new bytes32[](group.groupBetsArray.length);
      for(uint j = 0; j < group.groupBetsArray.length; j++){
            if(group.groupBets[group.groupBetsArray[j]].exists){
                groupBet[j] = (group.groupBetsArray[j]);
            }

        }
  }

  function listMembers(bytes32 gid) returns (address[] memberID, int[] amount){
      Group group = groups[gid];
      memberID = new address[](group.members.length);
      amount = new int[](group.members.length);
      for(uint j = 0; j < group.members.length; j++){
            memberID[j] = group.members[j];
            amount[j] = group.balances[group.members[j]];
        }
  }

  function listGroupBets(address uaddr) constant returns(bytes32[] groupBets){
      groupBets = new bytes32[](users[msg.sender].groupBets.length);
      var(groupIds , , ) = listGroups(uaddr);
      for(uint i = 0; i < groupIds.length; i++){
          Group group = groups[groupIds[i]];
          for(uint j = 0; j < group.groupBetsArray.length; j++){
                if(group.groupBets[group.groupBetsArray[j]].bets[uaddr].exists){
                    groupBets[i*j] = (group.groupBetsArray[j]);
                }
          }

      }
      return  groupBets;
  }

  function listBets(address uaddr) constant returns (bool[] stance ,uint[] amount ,bytes32[] groupIDs) { //returns an array of bets name as well as a corrosponding array of groupbets that the bet belongs too
      uint length = users[uaddr].groupBets.length;
      bool[] memory betsStance = new bool[](length);
      uint[] memory betsAmount = new uint[](length);
      bytes32[] memory gidName = new bytes32[](length);
      var(groupIds , , ) = listGroups(uaddr);
      uint count = 0;
      for(uint i = 0; i < groupIds.length; i++){
          Group group = groups[groupIds[i]];
          for(uint j = 0; j < group.groupBetsArray.length; j++){
                if(group.groupBets[group.groupBetsArray[j]].bets[uaddr].exists){
                    betsStance[count] = (group.groupBets[group.groupBetsArray[j]].bets[uaddr].stance);
                    betsAmount[count] = (group.groupBets[group.groupBetsArray[j]].bets[uaddr].amount);
                    gidName[count++] = (group.groupBets[group.groupBetsArray[j]].name);
                }
          }

      }
      return (betsStance,betsAmount,gidName);

  }
  function sendToken(address toAdr, bytes32 gid, uint amount) returns (int balance){
    assert(groups[gid].isMember[toAdr]);
    groups[gid].balances[msg.sender] = groups[gid].balances[msg.sender] - int(amount);
    groups[gid].balances[toAdr] = groups[gid].balances[toAdr] + int(amount);
    return groups[gid].balances[msg.sender];
  }

  function getbalance(bytes32 gid) constant returns (int balance) {
      return groups[gid].balances[msg.sender];
  }

  //for debugging:
  function getSenderAddress() constant returns (address) {
      return msg.sender;
  }
}
