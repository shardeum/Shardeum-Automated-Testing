
# Shardeum Automated Test

This project helps in testing AMM,  ERC contracts deployments and RPC tests of Shardeum Test networks.

To Setup The Project Run:

`npm install`

Create a `.env` and copy the  `.env.example`  to  `.env`  file  and provide

`WALLET_ADDRESS= PRIVATE_KEY= TO_ADDRESS= any wallet address`

To Run Tests:

`1. RPC Test`

`RPC=https://sphinx.shardeum.org npm run rpc-test`

`2. ERC Test`

`RPC=https://sphinx.shardeum.org npm run erc-test`

`3. AMM Test`

`RPC=https://sphinx.shardeum.org npm run amm-test`

**Note:**  Make Sure to Add wallet  .env which contains coins to pay the gas fee.

This commands for running tests above are for Shardeum Sphinx Validator network, if you want to run tests for Dapps Network, you need to make the following changes:

1. In all tests commands, change it to:

`RPC=https://dapps.shardeum.org` and remaining part as it is for each respective test.

2. Make sure to have uniswap Router deployed on Dapps Network, and change the existing `ROUTER_ADDRESS` with the address of deployed router on dapps network.