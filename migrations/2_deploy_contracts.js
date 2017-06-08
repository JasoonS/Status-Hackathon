var PeerCoin = artifacts.require("./PeerCoin.sol")
var Web3 = require('web3')

module.exports = function(deployer) {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      // web3 = new Web3(new Web3.providers.HttpProvider('http://172.18.150.167:8546'));
  }

  // console.log('output...')
  // web3.eth.getAccounts().then(console.log)

  let peerCoin
  deployer.deploy(PeerCoin).then(() => {
    console.log('deployed...')
    return PeerCoin.deployed()
  }).then((instance) => {
    peerCoin = instance
    instance.createGroup("aname", "a")
    instance.createGroup("bname", "b")
    return instance.createGroup("cname", "c")
    // instance.sendToken("0xf15e7f2ba0476a8a1e76138245f6fd4ffaf04bb4", "a", 5)
    // instance.sendToken("0xf15e7F2bA0476A8a1e76138245f6Fd4FfaF04bB4", "b", 123)
    // instance.sendToken("0xf15e7F2bA0476A8a1e76138245f6Fd4FfaF04bB4", "c", 55)

    console.log('yeeah')
    // .then((error, accounts) => {
    //   console.log('accounts', accounts)
    //   // Do things with specific accounts...
    // })
  }).then(()=>{
    peerCoin.sendToken("0xf15e7f2ba0476a8a1e76138245f6fd4ffaf04bb4", "a", 5)
    peerCoin.sendToken("0xf15e7F2bA0476A8a1e76138245f6Fd4FfaF04bB4", "b", 123)
    peerCoin.sendToken("0xf15e7F2bA0476A8a1e76138245f6Fd4FfaF04bB4", "c", 55)
  })
}
//
// var Registry = artifacts.require(“./Registry.sol”);
// var RedditRegistrarComputation = artifacts.require(“./RedditRegistrarComputation.sol”)
// var GithubRegistrarComputation = artifacts.require(“./GithubRegistrarComputation.sol”)
//
// module.exports = function(deployer) {
//   var registry;
//   deployer.deploy(Registry).then(function() {
//     return deployer.deploy(RedditRegistrarComputation, Registry.address);
//   }).then(function() {
//     return deployer.deploy(GithubRegistrarComputation, Registry.address);
//   }).then(function() {
//     return Registry.deployed();
//   }).then(function(instance) {
//     registry = instance;
//     return registry.createRegistrar(“reddit”, RedditRegistrarComputation.address);
//   }).then(function(txId) {
//     return registry.createRegistrar(“github”, GithubRegistrarComputation.address);
//   });
// };
