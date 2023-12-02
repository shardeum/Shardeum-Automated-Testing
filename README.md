# Shardeum Automated Test

This project helps in testing AMM, ERC contracts deployments and RPC tests

To Setup The Project Run:


```
npm install
```

copy ```.env.example``` to  ```.env``` file 
and provide 
```
WALLET_ADDRESS=
PRIVATE_KEY=
TO_ADDRESS= any wallet address
```

To Run Tests

```1. RPC Test```
  
``` RPC=https://sphinx.shardeum.org npm run rpc-test ```

```2. ERC Test```
  
``` RPC=https://sphinx.shardeum.org npm run erc-test ```


```3. AMM Test```
  
``` RPC=https://sphinx.shardeum.org npm run amm-test ```




Note: Make Sure to Add wallet .env which contains coins to pay the gas fee




RPC=https://sphinx.shardeum.org
