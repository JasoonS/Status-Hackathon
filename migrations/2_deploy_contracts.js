var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var PeerCoin = artifacts.require("./PeerCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PeerCoin);
};
