require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.4",
  networks : {
    rinkeby : {
      url : process.env.RINKEBY,
      accounts : [process.env.PVT_KEY],
    },
    mumbai : {
      url : process.env.MUMBAI,
      accounts : [process.env.PVT_KEY],
    }
  },
};
