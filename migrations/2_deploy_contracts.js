const TradeContract = artifacts.require("TradeContract");

module.exports = function(deployer) {
  deployer.deploy(TradeContract);
};