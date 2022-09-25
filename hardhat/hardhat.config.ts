import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-toolbox";

import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();
const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test test",
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [ 
      {
        version: "0.8.13",
        settings: {},
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: process.env.OPTIMISM_URL || "",
      },
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts,
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts,
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      gasPrice: 30000000000,
      accounts,
    },
    matic: {
      url: process.env.MATIC_URL || "",
      gasPrice: 99000000000,
      accounts,
    },
    optimism: {
      url: process.env.OPTIMISM_URL || "",
      accounts,
    },
    optimismk: {
      url: "https://kovan.optimism.io",
      gasPrice: 30000000000,
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 180000
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 30,
    enabled: (process.env.REPORT_GAS) ? true : false
  }
};

export default config;