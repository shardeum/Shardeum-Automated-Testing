import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const rpc = process.env.RPC || "https://api.zan.top/node/v1/bsc/testnet/public";

if (!privateKey) {
  throw new Error("Provide Private key in ENV");
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.6.6" }
    ]
  },
  mocha: {
    timeout: 10000000
  },
  networks: {
    testingNetwork: {
      url: rpc || "https://localhost",
      accounts: [privateKey],
      gasPrice: 5000000000
    }
  }
};

export default config;

