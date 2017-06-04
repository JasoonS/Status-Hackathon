var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var PeerCoin = artifacts.require("./PeerCoin.sol");
var People = artifacts.require("./People.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PeerCoin);
  deployer.deploy(People);
};
